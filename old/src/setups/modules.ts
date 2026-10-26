import type { ModuleOptions as ElementPlusModuleOptions } from '@element-plus/nuxt';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';

import type { ResolvedModuleOptions } from '../types/options';

export async function setupModules(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (!resolvedModuleOptions.enabledModules) return;
    const promises = [];
    if (resolvedModuleOptions.enabledModules.colorMode) promises.push(setupColorMode(nuxt));
    if (resolvedModuleOptions.enabledModules.elementPlus) promises.push(setupElementPlus(nuxt));
    if (resolvedModuleOptions.enabledModules.robots) promises.push(setupRobots(nuxt));
    if (resolvedModuleOptions.enabledModules.security) promises.push(setupSecurity(nuxt));
    if (resolvedModuleOptions.enabledModules.unoCss) promises.push(setupUnoCss(resolvedModuleOptions, nuxt));
    if (resolvedModuleOptions.enabledModules.unpluginFonts) promises.push(setupUnpluginFonts(nuxt));
    if (resolvedModuleOptions.enabledModules.vueUse) promises.push(setupVueUse(nuxt));
    await Promise.all(promises);
}

async function setupRobots(nuxt: Nuxt) {
    await installModule('@nuxtjs/robots', {}, nuxt);
}

async function setupSecurity(nuxt: Nuxt) {
    await installModule('nuxt-security', {}, nuxt);
}

async function setupUnoCss(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (resolvedModuleOptions.unoCss.enabledResets) {
        if (resolvedModuleOptions.unoCss.enabledResets.tailwind) nuxt.options.css.push('@unocss/reset/tailwind.css');
    }

    await installModule('@unocss/nuxt', {}, nuxt);
}

async function setupUnpluginFonts(nuxt: Nuxt) {
    await installModule('unplugin-fonts/nuxt', {}, nuxt);
}

async function setupVueUse(nuxt: Nuxt) {
    await installModule('@vueuse/nuxt', {}, nuxt);
}
