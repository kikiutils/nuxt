import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { ModuleOptions as ColorModeModuleOptions } from '@nuxtjs/color-mode';
import { defu } from 'defu';

import type { ResolvedModuleOptions } from '../types/options';

async function setupColorMode(nuxt: Nuxt) {
    nuxt.options.colorMode = defu<ColorModeModuleOptions, Partial<ColorModeModuleOptions>[]>(
        nuxt.options.colorMode,
        {
            classSuffix: '',
            preference: 'dark',
        },
    );

    await installModule('@nuxtjs/color-mode', {}, nuxt);
}

export async function setupModules(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (!resolvedModuleOptions.enabledModules) return;
    if (resolvedModuleOptions.enabledModules.colorMode) await setupColorMode(nuxt);
}
