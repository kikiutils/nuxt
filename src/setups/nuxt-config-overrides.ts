import type {
    Nuxt,
    ViteConfig,
} from '@nuxt/schema';
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

    nuxt.options.vite = defu<ViteConfig, ViteConfig[]>(
        resolvedModuleOptions.nuxtConfigOverrides?.vite,
        { build: { assetsInlineLimit: 0 } },
        nuxt.options.vite,
    );
}
