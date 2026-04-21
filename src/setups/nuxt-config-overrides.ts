import type { ModuleOptions as DevtoolsModuleOptions } from '@nuxt/devtools';
import type {
    Nuxt,
    ViteConfig,
} from '@nuxt/schema';
import { defu } from 'defu';
import type { NitroConfig } from 'nitropack/types';
import type { NuxtOptions } from 'nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

// Constants
const defaultTsConfigCompilerOptions = {
    noImplicitOverride: true,
    noUncheckedIndexedAccess: true,
    noUncheckedSideEffectImports: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
} as const;

// Functions
export function setupNuxtConfigOverrides(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (nuxt.options.devtools !== false) {
        nuxt.options.devtools = defu<DevtoolsModuleOptions, Partial<DevtoolsModuleOptions>[]>(
            resolvedModuleOptions.nuxtConfigOverrides?.devtools,
            { enabled: false },
            nuxt.options.devtools,
        );
    }

    nuxt.options.experimental = defu<NuxtOptions['experimental'], Partial<NuxtOptions['experimental']>[]>(
        resolvedModuleOptions.nuxtConfigOverrides?.experimental,
        { headNext: true },
        nuxt.options.experimental,
    );

    nuxt.options.nitro = defu<NitroConfig, Partial<NitroConfig>[]>(
        resolvedModuleOptions.nuxtConfigOverrides?.nitro,
        {
            compressPublicAssets: process.env.NODE_ENV === 'production',
            minify: process.env.NODE_ENV === 'production',
            typescript: { tsConfig: { compilerOptions: defaultTsConfigCompilerOptions } },
        },
        nuxt.options.nitro,
    );

    nuxt.options.typescript = defu<NuxtOptions['typescript'], Partial<NuxtOptions['typescript']>[]>(
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
