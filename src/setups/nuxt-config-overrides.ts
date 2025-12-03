import { existsSync } from 'node:fs';

import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';

import type { ResolvedModuleOptions } from '../types/options';

// Constants
const defaultTsConfigCompilerOptions = {
    allowSyntheticDefaultImports: false,
    esModuleInterop: false,
    noImplicitOverride: true,
    noUncheckedIndexedAccess: true,
    noUncheckedSideEffectImports: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
} as const;

// Functions
function extractPackageName(id: string) {
    const parts = id.split('node_modules/').pop()?.split('/');
    if (!parts) return;
    if (parts[0]?.startsWith('@')) return `${parts[0]}/${parts[1]}`;
    return parts[0];
}

export function setupNuxtConfigOverrides(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    nuxt.options.devtools = defu(
        resolvedModuleOptions.nuxtConfigOverrides?.devtools,
        { enabled: false },
        nuxt.options.devtools,
    );

    nuxt.options.experimental = defu(
        resolvedModuleOptions.nuxtConfigOverrides?.experimental,
        { headNext: true },
        nuxt.options.experimental,
    );

    nuxt.options.nitro = defu(
        resolvedModuleOptions.nuxtConfigOverrides?.nitro,
        {
            compressPublicAssets: true,
            minify: true,
            typescript: { tsConfig: { compilerOptions: defaultTsConfigCompilerOptions } },
        },
        nuxt.options.nitro,
    );

    nuxt.options.typescript = defu(
        resolvedModuleOptions.nuxtConfigOverrides?.typescript,
        {
            nodeTsConfig: { compilerOptions: defaultTsConfigCompilerOptions },
            strict: true,
            tsConfig: { compilerOptions: defaultTsConfigCompilerOptions },
            typeCheck: true,
        },
        nuxt.options.typescript,
    );

    nuxt.options.vite = defu(
        resolvedModuleOptions.nuxtConfigOverrides?.vite,
        {
            build: {
                assetsInlineLimit: 0,
                rollupOptions: {
                    output: {
                        manualChunks(id: string) {
                            if (!id.includes('node_modules') || !existsSync(id)) return;

                            const packageName = extractPackageName(id);
                            if (!packageName) return;

                            // eslint-disable-next-line regexp/no-unused-capturing-group
                            if (/\.(css|sass|scss)/.test(id)) return `${packageName}/${id.split('/').pop()}`;

                            if (packageName === 'nuxt') return;

                            // TODO
                            return packageName;
                        },
                    },
                },
            },
        },
        nuxt.options.vite,
    );
}
