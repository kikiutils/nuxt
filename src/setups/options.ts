import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';
import removeConsole from 'vite-plugin-remove-console';

import type { RequiredModuleOptions } from '../types/options';

export function setupOptions({ nuxtOptions: moduleNuxtOptions }: RequiredModuleOptions, { options: nuxtOptions }: Nuxt) {
    nuxtOptions.devtools = defu(moduleNuxtOptions?.devtools, { enabled: false }, nuxtOptions.devtools);
    nuxtOptions.experimental = defu(
        moduleNuxtOptions?.experimental,
        {
            headNext: true,
            inlineSSRStyles: false,
        },
        nuxtOptions.experimental,
    );

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
                            if (id.endsWith('.css')) return;
                            const moduleName = id.match(/\.pnpm\/@?([^@]+)@/)?.[1];
                            return moduleName?.includes('nuxt') ? 'nuxt' : moduleName;
                        },
                    },
                },
            },
        },
        nuxtOptions.vite,
    );
}

export function setupVitePlugins(
    {
        enabledVitePlugins,
        removeConsoleOptions,
    }: RequiredModuleOptions,
    nuxt: Nuxt,
) {
    if (!enabledVitePlugins || enabledVitePlugins?.removeConsole === false) return;
    nuxt.options.vite.plugins ||= [];
    nuxt.options.vite.plugins.push(removeConsole(removeConsoleOptions));
}
