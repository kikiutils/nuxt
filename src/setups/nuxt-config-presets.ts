import { posix } from 'node:path';

import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

import { cycleSafeManualChunks } from './builder-manual-chunks';

// Functions
export function setupNuxtConfigPresets(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (resolvedModuleOptions.nuxtConfigPresets.viteAssetFileNames) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rollupOptions ||= {};
        nuxt.options.vite.build.rollupOptions.output ||= {};
        [nuxt.options.vite.build.rollupOptions.output].flat().forEach((output) => {
            output.assetFileNames ??= posix.join(nuxt.options.app.buildAssetsDir, '[hash].[ext]').replace(/^\//, '');
        });
    }

    if (resolvedModuleOptions.nuxtConfigPresets.viteManualChunks.enabled) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rollupOptions ||= {};
        nuxt.options.vite.build.rollupOptions.output ||= {};
        [nuxt.options.vite.build.rollupOptions.output]
            .flat()
            .forEach((output) => output.manualChunks ||= cycleSafeManualChunks);
    }
}
