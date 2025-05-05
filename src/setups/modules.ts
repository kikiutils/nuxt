import type { ModuleOptions as ElementPlusModuleOptions } from '@element-plus/nuxt';
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

async function setupElementPlus(nuxt: Nuxt) {
    nuxt.options.elementPlus = defu<ElementPlusModuleOptions, Partial<ElementPlusModuleOptions>[]>(
        nuxt.options.elementPlus,
        { themes: ['dark'] },
    );

    await installModule('@element-plus/nuxt', {}, nuxt);
}

async function setupRobots(nuxt: Nuxt) {
    await installModule('@nuxtjs/robots', {}, nuxt);
}

async function setupSecurity(nuxt: Nuxt) {
    await installModule('nuxt-security', {}, nuxt);
}

export async function setupModules(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (!resolvedModuleOptions.enabledModules) return;
    if (resolvedModuleOptions.enabledModules.colorMode) await setupColorMode(nuxt);
    if (resolvedModuleOptions.enabledModules.elementPlus) await setupElementPlus(nuxt);
    if (resolvedModuleOptions.enabledModules.robots) await setupRobots(nuxt);
    if (resolvedModuleOptions.enabledModules.security) await setupSecurity(nuxt);
}
