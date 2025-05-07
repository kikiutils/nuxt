import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';

import type { ResolvedModuleOptions } from '../types/options';

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
            typescript: {
                tsConfig: {
                    compilerOptions: {
                        allowSyntheticDefaultImports: false,
                        esModuleInterop: false,
                        noImplicitOverride: true,
                        noUncheckedIndexedAccess: true,
                        noUncheckedSideEffectImports: true,
                        noUnusedLocals: true,
                        noUnusedParameters: true,
                    },
                },
            },
        },
        nuxt.options.nitro,
    );

    nuxt.options.typescript = defu(
        resolvedModuleOptions.nuxtConfigOverrides?.typescript,
        {
            tsConfig: {
                compilerOptions: {
                    allowSyntheticDefaultImports: false,
                    esModuleInterop: false,
                    noImplicitOverride: true,
                    noUncheckedIndexedAccess: true,
                    noUncheckedSideEffectImports: true,
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                },
            },
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
                            if (!id.includes('node_modules') || id.endsWith('.css')) return;
                            const packageName = extractPackageName(id);
                            if (!packageName) return;
                            return packageName?.includes('nuxt') ? 'nuxt' : packageName;
                        },
                    },
                },
            },
        },
        nuxt.options.vite,
    );
}
