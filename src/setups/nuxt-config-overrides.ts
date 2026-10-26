import type {
    Nuxt,
    NuxtOptions,
} from '@nuxt/schema';
import { defu } from 'defu';

import type { ModuleOptions } from '../types/options';

type DevtoolsOptions = Exclude<NuxtOptions['devtools'], boolean>;

export function setupNuxtConfigOverrides(options: ModuleOptions, nuxt: Nuxt) {
    const overrides = options.nuxtConfigOverrides;

    // devtools
    if (overrides?.devtools !== undefined) {
        nuxt.options.devtools = typeof overrides.devtools === 'boolean'
            ? overrides.devtools
            : defu<DevtoolsOptions, Partial<DevtoolsOptions>[]>(
                overrides.devtools,
                typeof nuxt.options.devtools === 'boolean'
                    ? { enabled: nuxt.options.devtools }
                    : nuxt.options.devtools,
            );
    }

    // nitroConfig
    const nitroConfig = defu(
        overrides?.nitro,
        {
            compressPublicAssets: !nuxt.options.dev,
            minify: !nuxt.options.dev,
        },
        nuxt.options.nitro,
    );

    // Preserve Nuxt's linked nitro.typescript.tsConfig / typescript.serverTsConfig accessors.
    if (nuxt.options.nitro.typescript && nitroConfig.typescript) {
        Object.assign(nuxt.options.nitro.typescript, nitroConfig.typescript);
        nitroConfig.typescript = nuxt.options.nitro.typescript;
    }

    Object.assign(nuxt.options.nitro, nitroConfig);

    // typescript
    const compilerOverrides = overrides?.typescript?.tsConfig?.compilerOptions;
    const typescriptConfig = defu<NuxtOptions['typescript'], Partial<NuxtOptions['typescript']>[]>(
        overrides?.typescript,
        {
            nodeTsConfig: {
                compilerOptions: {
                    noUncheckedSideEffectImports:
                        compilerOverrides?.noUncheckedSideEffectImports ?? true,
                },
            },
            serverTsConfig: { compilerOptions: { noImplicitOverride: compilerOverrides?.noImplicitOverride ?? true } },
            tsConfig: {
                compilerOptions: {
                    noImplicitOverride: true,
                    noUncheckedIndexedAccess: true,
                    noUncheckedSideEffectImports: true,
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                },
            },
        },
        nuxt.options.typescript,
    );

    Object.assign(nuxt.options.typescript, typescriptConfig);

    // vite
    nuxt.options.vite = defu(
        overrides?.vite,
        { build: { assetsInlineLimit: 0 } },
        nuxt.options.vite,
    );
}
