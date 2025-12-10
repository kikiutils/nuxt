import { statSync } from 'node:fs';
import { join } from 'node:path';

import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

// Constants
const packageFileSizes: Record<string, Record<string, number>> = {};
const packagesAllowedForStylesChunking = new Set([
    '@fortawesome/fontawesome-free',
    '@kikiutils/nuxt',
    'animate.css',
    'ant-design-vue',
    'antd',
    'bootstrap',
    'element-plus',
    'ionicons',
    'material-icons',
    'primevue',
    'quasar',
    'remixicon',
    'vue3-carousel',
    'vue3-marquee',
]);

const packagesKnownNoCircularImport = new Set(['@kikiutils/shared']);

// Functions
function extractPackageName(id: string) {
    const parts = id.split('node_modules/').pop()?.split('/');
    if (!parts) return;
    if (parts[0]?.startsWith('@')) return `${parts[0]}/${parts[1]}`;
    return parts[0];
}

function getSizeBasedPackageChunkName(id: string, packageName: string) {
    const filePath = id.substring(id.lastIndexOf(`node_modules/${packageName}`));
    const fileSizes = packageFileSizes[packageName] ||= {};
    if (!fileSizes[filePath]) fileSizes[filePath] = statSync(id).size;
    const totalSize = Object.values(fileSizes).reduce((a, b) => a + b);
    const chunkIndex = Math.trunc(totalSize / (192 * 1024));
    return `${packageName}-${chunkIndex}`;
}

export function setupNuxtConfigPresets(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (resolvedModuleOptions.nuxtConfigPresets.viteAssetFileNames) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rollupOptions ||= {};
        nuxt.options.vite.build.rollupOptions.output ||= {};
        [nuxt.options.vite.build.rollupOptions.output].flat().forEach((output) => {
            output.assetFileNames ??= join(nuxt.options.app.buildAssetsDir, '[hash].[ext]').replace(/^\//, '');
        });
    }

    if (resolvedModuleOptions.nuxtConfigPresets.viteManualChunks) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rollupOptions ||= {};
        nuxt.options.vite.build.rollupOptions.output ||= {};
        [nuxt.options.vite.build.rollupOptions.output].flat().forEach((output) => {
            output.manualChunks ||= (id, { getModuleInfo }) => {
                if (!id.includes('node_modules') || id.startsWith('\x00') || id.startsWith('virtual:')) return;

                const packageName = extractPackageName(id);
                if (!packageName) return;

                // eslint-disable-next-line regexp/no-unused-capturing-group
                if (/\.(css|sass|scss)/.test(id)) {
                    // Only allow some packages to split their styles into dedicated chunks
                    if (!packagesAllowedForStylesChunking.has(packageName)) return;
                    return getSizeBasedPackageChunkName(id, packageName);
                }

                const moduleInfo = getModuleInfo(id);
                if (!moduleInfo) return;

                if (!packagesKnownNoCircularImport.has(packageName)) {
                    const importerPackageNames = new Set(
                        moduleInfo
                            .importers
                            .filter((id) => id.includes('node_modules') && !id.startsWith('virtual:'))
                            .map(extractPackageName),
                    );

                    if (importerPackageNames.has(packageName)) return packageName;
                }

                return getSizeBasedPackageChunkName(id, packageName);
            };
        });
    }
}
