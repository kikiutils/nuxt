import {
    readFileSync,
    statSync,
} from 'node:fs';

import {
    detectSyntax,
    parseNodeModulePath,
} from 'mlly';
import type { GetManualChunk } from 'rollup';

type ManualChunkApi = Parameters<GetManualChunk>[1];
type MllyNodeModulePath = ReturnType<typeof parseNodeModulePath>;
type NodeModulePath = MllyNodeModulePath & {
    dir: string;
    name: string;
    subpath: string;
};

type PackageExports = Record<string, unknown> | string | unknown[];

interface BucketCandidate {
    bytes: number;
    id: string;
    parts: string[];
}

interface BucketStats {
    bytes: number;
    modules: number;
}

interface GraphContext {
    cyclicChunkNames: Set<string>;
    moduleBuckets: Map<string, string>;
    packages: Map<string, PackageStats>;
    scc: Map<string, string[]>;
}

interface PackageMetadata {
    exportPatterns: string[];
    exports?: PackageExports;
    root?: string;
    sideEffects?: boolean | string[];
}

interface PackageStats {
    buckets: Map<string, BucketStats>;
    bytes: number;
    modules: number;
}

// Constants
const fileSizeCache = new Map<string, number>();
const globRegexCache = new Map<string, RegExp>();
const graphCache = new WeakMap<ManualChunkApi, GraphContext>();
const maxBucketDepth = 2;
const maxDominantBucketRatio = 0.9;
const minBucketsToSplit = 3;
const minDedicatedBucketBytes = 8 * 1024;
const minPackageBytesToSplit = 80 * 1024;
const minPackageModulesToSplit = 20;
const nodeModulePathCache = new Map<string, NodeModulePath | undefined>();
const nodeModulesRegex = /(?:^|[/\\])node_modules[/\\]/;
const packageMetadataCache = new Map<string, PackageMetadata>();
const scriptRegex = /\.(?:mjs|js|cjs|ts|tsx|jsx|vue)(?:$|[?&])/;
const styleRegex = /\.(?:css|sass|scss|less|styl|stylus)(?:$|[?&])/;
const syntaxCache = new Map<string, boolean>();
const virtualPrefixes = [
    '\0',
    'virtual:',
    'vite:',
    'nuxt:',
    '#',
];

// Functions
export const cycleSafeManualChunks: GetManualChunk = (id, api) => {
    if (isSkippableId(id)) return;
    const context = getGraphContext(api);
    if (!context) return;

    const candidate = bucketChunkName(id, context);
    if (!candidate) return;

    const component = context.scc.get(id);
    if (!component || component.length <= 1) return candidate;

    const names = new Set(component.map((member) => bucketChunkName(member, context)).filter(Boolean));
    if (names.size <= 1) return candidate;
};

const extractPackageName = (id: string) => getNodeModulePath(id)?.name;
const normalizeId = (id: string) => (id.split('?')[0] ?? id).replaceAll('\\', '/');
const stripExtension = (value = '') => value.replace(/\.[cm]?[jt]sx?$|\.vue$/i, '');

function bucketChunkName(id: string, context: GraphContext): string | undefined {
    const rawName = rawBucketChunkName(id, context);
    if (!rawName) return;

    if (context.cyclicChunkNames.has(rawName)) return;
    return rawName;
}

function buildCyclicChunkNameSet(
    nodes: string[],
    adjacency: Map<string, string[]>,
    context: GraphContext,
): Set<string> {
    const chunkEdges = new Map<string, Set<string>>();

    for (const id of nodes) {
        const fromChunk = rawBucketChunkName(id, context);
        if (!fromChunk) continue;

        const edges = chunkEdges.get(fromChunk) ?? new Set<string>();
        for (const target of adjacency.get(id) ?? []) {
            const toChunk = rawBucketChunkName(target, context);
            if (toChunk && toChunk !== fromChunk) edges.add(toChunk);
        }
        chunkEdges.set(fromChunk, edges);
    }

    const cyclicChunkNames = new Set<string>();
    const chunkNames = Array.from(chunkEdges.keys());
    const scc = buildSccLookup(chunkNames, chunkEdges);

    for (const chunkName of chunkNames) {
        const component = scc.get(chunkName);
        if (component && component.length > 1) {
            for (const member of component) cyclicChunkNames.add(member);
        }
    }

    return cyclicChunkNames;
}

function buildPackageCandidates(nodes: string[], api: ManualChunkApi): Map<string, BucketCandidate[]> {
    const packages = new Map<string, BucketCandidate[]>();

    for (const id of nodes) {
        const packageName = extractPackageName(id);
        if (!packageName) continue;

        const subpath = getPackageSubpath(id, packageName);
        const candidate = createBucketCandidate(packageName, subpath, id, api);
        if (!candidate) continue;

        const candidates = packages.get(packageName) ?? [];
        candidates.push(candidate);
        packages.set(packageName, candidates);
    }

    return packages;
}

function buildSccLookup(nodes: string[], adjacency: Map<string, Iterable<string>>): Map<string, string[]> {
    let nextIndex = 0;
    const stack: string[] = [];
    const onStack = new Set<string>();
    const indexes = new Map<string, number>();
    const lowlinks = new Map<string, number>();
    const components = new Map<string, string[]>();

    function strongConnect(node: string) {
        indexes.set(node, nextIndex);
        lowlinks.set(node, nextIndex);
        nextIndex += 1;
        stack.push(node);
        onStack.add(node);

        for (const edge of adjacency.get(node) ?? []) {
            if (!indexes.has(edge)) {
                strongConnect(edge);
                lowlinks.set(node, Math.min(lowlinks.get(node) ?? nextIndex, lowlinks.get(edge) ?? nextIndex));
            } else if (onStack.has(edge)) {
                lowlinks.set(node, Math.min(lowlinks.get(node) ?? nextIndex, indexes.get(edge) ?? nextIndex));
            }
        }

        if (lowlinks.get(node) === indexes.get(node)) {
            const component: string[] = [];
            let current: string | undefined;
            do {
                current = stack.pop();
                if (current === undefined) break;
                onStack.delete(current);
                component.push(current);
            } while (current !== node);

            for (const member of component) components.set(member, component);
        }
    }

    for (const node of nodes) {
        if (!indexes.has(node)) strongConnect(node);
    }

    return components;
}

function collectExportPatterns(exports: PackageExports | undefined): string[] {
    const patterns = new Set<string>();

    function visit(value: unknown, key?: string) {
        if (key?.startsWith?.('./')) patterns.add(key);
        if (typeof value === 'string') {
            if (value.startsWith('./')) patterns.add(value);
            return;
        }

        if (Array.isArray(value)) {
            for (const entry of value) visit(entry);
            return;
        }

        if (value && typeof value === 'object') {
            for (const [childKey, childValue] of Object.entries(value)) visit(childValue, childKey);
        }
    }

    if (typeof exports === 'string') visit(exports);
    else if (exports && typeof exports === 'object') {
        for (const [key, value] of Object.entries(exports)) visit(value, key);
    }

    return Array.from(patterns);
}

function createBucketCandidate(
    packageName: string | undefined,
    subpath: string,
    id: string,
    api: ManualChunkApi,
): BucketCandidate | undefined {
    if (styleRegex.test(id)) {
        return {
            bytes: getFileSize(id),
            id,
            parts: [
                'asset',
                'style',
            ],
        };
    }
    if (
        !packageName
        || !scriptRegex.test(id)
        || !isPublicPackageSubpath(packageName, subpath, id)
        || !isSplittableSyntax(id)
    ) return;

    if (isSideEffectfulModule(packageName, subpath, id, api)) {
        return {
            bytes: getFileSize(id),
            id,
            parts: [
                'side-effect',
                'shared',
            ],
        };
    }

    const parts = getLogicalSubpathParts(subpath);
    if (!parts.length) return;

    return {
        bytes: getFileSize(id),
        id,
        parts,
    };
}

function createGraphContext(api: ManualChunkApi): GraphContext {
    const ids = Array.from(api.getModuleIds?.() ?? []);
    const nodes = ids.filter((id) => !isSkippableId(id) && extractPackageName(id));
    const nodeSet = new Set(nodes);
    const adjacency = new Map<string, string[]>();
    const moduleBuckets = new Map<string, string>();
    const packages = new Map<string, PackageStats>();
    const packageCandidates = buildPackageCandidates(nodes, api);

    for (const [packageName, candidates] of packageCandidates.entries()) {
        const prefix = inferSharedPrefix(candidates.map((candidate) => candidate.parts));
        const stats: PackageStats = {
            buckets: new Map<string, BucketStats>(),
            bytes: 0,
            modules: 0,
        };

        for (const candidate of candidates) {
            const bucket = inferGenericBucket(candidate.parts, prefix);
            if (!bucket) continue;

            moduleBuckets.set(candidate.id, bucket);

            const bucketStats = stats.buckets.get(bucket) ?? {
                bytes: 0,
                modules: 0,
            };

            bucketStats.bytes += candidate.bytes;
            bucketStats.modules += 1;
            stats.bytes += candidate.bytes;
            stats.modules += 1;
            stats.buckets.set(bucket, bucketStats);
        }

        packages.set(packageName, stats);
    }

    for (const id of nodes) {
        const info = api.getModuleInfo?.(id);
        const importedIds = info?.importedIds ?? [];

        adjacency.set(
            id,
            importedIds.filter((target) => nodeSet.has(target)),
        );
    }

    const context = {
        cyclicChunkNames: new Set<string>(),
        moduleBuckets,
        packages,
        scc: buildSccLookup(nodes, adjacency),
    };

    context.cyclicChunkNames = buildCyclicChunkNameSet(nodes, adjacency, context);
    return context;
}

function getFileSize(id: string): number {
    const filePath = normalizeId(id);
    const cachedSize = fileSizeCache.get(filePath);
    if (cachedSize !== undefined) return cachedSize;

    let size = 0;
    try {
        size = statSync(filePath).size;
    } catch {
        // Virtualized/resolved modules can be absent on disk. Count them as zero;
        // Rollup's graph still controls whether they are safe to split.
    }

    fileSizeCache.set(filePath, size);
    return size;
}

function getGraphContext(api: ManualChunkApi): GraphContext | undefined {
    if (!api?.getModuleIds || !api?.getModuleInfo) return;
    let context = graphCache.get(api);
    if (!context) {
        context = createGraphContext(api);
        graphCache.set(api, context);
    }

    return context;
}

function getLogicalSubpathParts(subpath: string): string[] {
    return subpath
        .split('/')
        .filter(Boolean)
        .map((part) => stripExtension(part))
        .filter((part) => part && part !== 'index');
}

function getNodeModulePath(id: string): NodeModulePath | undefined {
    const normalized = normalizeId(id);
    if (nodeModulePathCache.has(normalized)) return nodeModulePathCache.get(normalized);

    let parsed;
    try {
        parsed = parseNodeModulePath(normalized) as NodeModulePath | undefined;
    } catch {
        parsed = undefined;
    }

    if (!parsed?.name) parsed = parseNodeModulePathFallback(normalized);
    nodeModulePathCache.set(normalized, parsed);
    return parsed;
}

function getPackageMetadata(packageName: string | undefined, id: string): PackageMetadata {
    const root = getPackageRoot(id, packageName);
    if (!root) return { exportPatterns: [] };

    const cachedMetadata = packageMetadataCache.get(root);
    if (cachedMetadata) return cachedMetadata;

    let metadata: PackageMetadata = { exportPatterns: [] };
    try {
        const packageJson = JSON.parse(readFileSync(`${root}/package.json`, 'utf8'));
        const exports = packageJson.exports;
        metadata = {
            exportPatterns: collectExportPatterns(exports),
            exports,
            root,
            sideEffects: packageJson.sideEffects,
        };
    } catch {
        metadata = {
            exportPatterns: [],
            root,
        };
    }

    packageMetadataCache.set(root, metadata);
    return metadata;
}

function getPackageRoot(id: string, packageName: string | undefined): string | undefined {
    const parsed = getNodeModulePath(id);
    if (!parsed || parsed.name !== packageName) return;
    return `${parsed.dir}${packageName}`;
}

function getPackageSubpath(id: string, packageName: string | undefined): string {
    const parsed = getNodeModulePath(id);
    if (packageName && parsed?.name === packageName) return parsed.subpath.replace(/^\.\//, '');
    return '';
}

function globPatternToRegExp(pattern: string): RegExp {
    const cachedRegex = globRegexCache.get(pattern);
    if (cachedRegex) return cachedRegex;

    let source = '';
    for (let index = 0; index < pattern.length; index += 1) {
        const char = pattern[index];
        if (!char) continue;

        const next = pattern[index + 1];

        if (char === '*' && next === '*') {
            const afterGlobstar = pattern[index + 2];
            source += afterGlobstar === '/' ? '(?:.*/)?' : '.*';
            index += afterGlobstar === '/' ? 2 : 1;
        } else if (char === '*') {
            source += '[^/]*';
        } else {
            source += char.replace(/[.+^${}()|[\]\\]/g, '\\$&');
        }
    }

    const regex = new RegExp(`^${source}$`);
    globRegexCache.set(pattern, regex);
    return regex;
}

function inferGenericBucket(parts: string[], prefix: string[]): string {
    const remaining = parts.slice(prefix.length);
    const bucketParts = remaining.length ? remaining : parts.slice(-1);
    return bucketParts.slice(0, maxBucketDepth).join('-');
}

function inferSharedPrefix(partLists: string[][]): string[] {
    const eligible = partLists.filter((parts) => parts.length > 1);
    if (eligible.length < minBucketsToSplit) return [];

    const shortest = Math.min(...eligible.map((parts) => parts.length));
    const maxPrefixLength = Math.max(0, shortest - 1);
    const prefix: string[] = [];

    const first = eligible[0];
    if (!first) return [];

    for (let index = 0; index < maxPrefixLength; index += 1) {
        const value = first[index];
        if (value === undefined || !eligible.every((parts) => parts[index] === value)) break;
        prefix.push(value);
    }

    return prefix;
}

function isExportPatternMatch(pattern: string, requestedPath: string): boolean {
    if (pattern === requestedPath) return true;
    if (pattern.includes('*')) {
        const [prefix = '', suffix = ''] = pattern.split('*');
        return requestedPath.startsWith(prefix) && requestedPath.endsWith(suffix);
    }

    return requestedPath.startsWith(`${pattern}/`);
}

function isPackageWorthSplitting(stats: PackageStats | undefined): boolean {
    if (!stats) return false;
    if (stats.buckets.size < minBucketsToSplit) return false;
    if (stats.bytes < minPackageBytesToSplit && stats.modules < minPackageModulesToSplit) return false;

    const largestBucketBytes = Math.max(...Array.from(stats.buckets.values(), (bucket) => bucket.bytes));
    return stats.bytes === 0 || largestBucketBytes / stats.bytes <= maxDominantBucketRatio;
}

function isPublicPackageSubpath(packageName: string | undefined, subpath: string, id: string): boolean {
    const { exportPatterns = [], exports } = getPackageMetadata(packageName, id);
    if (!exports) return true;

    const requestedPath = subpath === '.' ? '.' : `./${subpath}`;
    return requestedPath === '.' || exportPatterns.some((pattern) => isExportPatternMatch(pattern, requestedPath));
}

function isSideEffectfulByPackageMetadata(packageName: string | undefined, subpath: string, id: string): boolean {
    const { root, sideEffects } = getPackageMetadata(packageName, id);
    if (sideEffects === true) return true;
    if (sideEffects === false || !Array.isArray(sideEffects) || !root) return false;

    const normalizedId = normalizeId(id);
    const rootPrefix = `${root}/`;
    const packageRelativePath = normalizedId.startsWith(rootPrefix)
        ? normalizedId.slice(rootPrefix.length)
        : subpath;

    return sideEffects.some((pattern) => typeof pattern === 'string' && (
        isSideEffectPatternMatch(pattern, packageRelativePath)
        || isSideEffectPatternMatch(pattern, subpath)
    ));
}

function isSideEffectfulModule(
    packageName: string | undefined,
    subpath: string,
    id: string,
    api: ManualChunkApi,
): boolean {
    const moduleSideEffects = api?.getModuleInfo?.(id)?.moduleSideEffects;
    if (moduleSideEffects === true || moduleSideEffects === 'no-treeshake') return true;
    if (moduleSideEffects === false) return false;
    return isSideEffectfulByPackageMetadata(packageName, subpath, id);
}

function isSideEffectPatternMatch(pattern: string, packageRelativePath: string): boolean {
    const normalizedPattern = pattern.replaceAll('\\', '/').replace(/^\.\//, '');
    if (normalizedPattern === packageRelativePath) return true;

    return globPatternToRegExp(normalizedPattern).test(packageRelativePath);
}

function isSkippableId(id: string): boolean {
    return !nodeModulesRegex.test(id) || virtualPrefixes.some((prefix) => id.startsWith(prefix));
}

function isSplittableSyntax(id: string): boolean {
    const filePath = normalizeId(id);
    if (filePath.endsWith('.cjs')) return false;
    if (filePath.endsWith('.mjs') || filePath.endsWith('.vue')) return true;
    const cachedSyntax = syntaxCache.get(filePath);
    if (cachedSyntax !== undefined) return cachedSyntax;

    let splittable = true;
    try {
        const syntax = detectSyntax(readFileSync(filePath, 'utf8'));
        splittable = syntax.hasESM || !syntax.hasCJS;
    } catch {
        splittable = true;
    }

    syntaxCache.set(filePath, splittable);
    return splittable;
}

function parseNodeModulePathFallback(id: string): NodeModulePath | undefined {
    const marker = '/node_modules/';
    const nodeModulesIndex = id.lastIndexOf(marker);
    if (nodeModulesIndex < 0) return;

    const dir = id.slice(0, nodeModulesIndex + marker.length);
    const parts = id.slice(nodeModulesIndex + marker.length).split('/').filter(Boolean);
    const scopeOrName = parts[0];
    if (!scopeOrName) return;

    const name = scopeOrName.startsWith('@') ? parts[1] ? `${scopeOrName}/${parts[1]}` : undefined : scopeOrName;
    if (!name || name.startsWith('.')) return;

    const subpathParts = parts.slice(name.startsWith('@') ? 2 : 1);
    return {
        dir,
        name,
        subpath: subpathParts.length ? `./${subpathParts.join('/')}` : '.',
    };
}

function rawBucketChunkName(id: string, context: GraphContext): string | undefined {
    const packageName = extractPackageName(id);
    if (!packageName) return;

    const stats = context.packages.get(packageName);
    if (!stats || !isPackageWorthSplitting(stats)) return;

    const bucket = context.moduleBuckets.get(id);
    if (!bucket) return;

    const bucketStats = stats.buckets.get(bucket);
    if (!bucketStats) return;

    const packagePart = sanitizeChunkPart(packageName);
    if (bucketStats.bytes < minDedicatedBucketBytes) return `${packagePart}-shared`;
    return `${packagePart}-${sanitizeChunkPart(bucket)}`;
}

function sanitizeChunkPart(value: string): string {
    return value
        .replace(/^@/, '')
        .replace(/[^\w.-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase() || 'misc';
}
