import type { Nuxt } from '@nuxt/schema';

import type { ModuleOptions } from '../types/options';

export function setupTsConfigPaths(options: ModuleOptions, nuxt: Nuxt) {
    if (!options.removeTildeTsConfigPaths) return;

    nuxt.hook(
        'prepare:types',
        ({ tsConfig }) => {
            delete tsConfig.compilerOptions?.paths?.['~'];
            delete tsConfig.compilerOptions?.paths?.['~/*'];
        },
    );
}
