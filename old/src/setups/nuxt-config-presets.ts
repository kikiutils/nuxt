import { posix } from 'node:path';

import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

// Functions
export function setupNuxtConfigPresets(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (resolvedModuleOptions.nuxtConfigPresets.viteAssetFileNames) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rolldownOptions ||= {};
        nuxt.options.vite.build.rolldownOptions.output ||= {};
        [nuxt.options.vite.build.rolldownOptions.output].flat().forEach((output) => {
            output.assetFileNames ??= posix.join(nuxt.options.app.buildAssetsDir, '[hash].[ext]').replace(/^\//, '');
        });
    }
}
