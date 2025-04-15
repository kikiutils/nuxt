import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';

import type { RequiredModuleOptions } from '../types/options';

function extractPackageName(id: string) {
    const parts = id.split('node_modules/').pop()?.split('/');
    if (!parts) return;
    if (parts[0]?.startsWith('@')) return `${parts[0]}/${parts[1]}`;
    return parts[0];
}

export function setupOptions(
    { nuxtOptions: moduleNuxtOptions }: RequiredModuleOptions,
    { options: nuxtOptions }: Nuxt,
) {
    nuxtOptions.devtools = defu(moduleNuxtOptions?.devtools, { enabled: false }, nuxtOptions.devtools);
    nuxtOptions.experimental = defu(moduleNuxtOptions?.experimental, { headNext: true }, nuxtOptions.experimental);
    nuxtOptions.nitro = defu(
        moduleNuxtOptions?.nitro,
        {
            compressPublicAssets: true,
            minify: true,
        },
        nuxtOptions.nitro,
    );

    nuxtOptions.typescript = defu(
        moduleNuxtOptions?.typescript,
        {
            tsConfig: {
                compilerOptions: {
                    allowSyntheticDefaultImports: false,
                    noUncheckedIndexedAccess: true,
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                },
            },
            typeCheck: true,
        },
        nuxtOptions.typescript,
    );

    nuxtOptions.vite = defu(
        moduleNuxtOptions?.vite,
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
        nuxtOptions.vite,
    );
}
