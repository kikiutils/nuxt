import type { ModuleOptions as ElementPlusModuleOptions } from '@element-plus/nuxt';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';

import type { ResolvedModuleOptions } from '../types/options';

async function setupColorMode(nuxt: Nuxt) {
    nuxt.options.colorMode = defu(
        nuxt.options.colorMode,
        {
            classSuffix: '',
            preference: 'dark',
            storage: nuxt.options.ssr ? 'cookie' as const : 'localStorage' as const,
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

export async function setupModules(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (!resolvedModuleOptions.enabledModules) return;
    const promises = [];
    if (resolvedModuleOptions.enabledModules.colorMode) promises.push(setupColorMode(nuxt));
    if (resolvedModuleOptions.enabledModules.elementPlus) promises.push(setupElementPlus(nuxt));
    if (resolvedModuleOptions.enabledModules.robots) promises.push(setupRobots(nuxt));
    if (resolvedModuleOptions.enabledModules.security) promises.push(setupSecurity(nuxt));
    if (resolvedModuleOptions.enabledModules.unoCss) promises.push(setupUnoCss(resolvedModuleOptions, nuxt));
    if (resolvedModuleOptions.enabledModules.unpluginFonts) {
        promises.push(setupUnpluginFonts(resolvedModuleOptions, nuxt));
    }

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

async function setupUnpluginFonts(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    nuxt.options.app.head.link ??= [];

    if (resolvedModuleOptions.unpluginFonts.google.addPreconnectLink) {
        nuxt.options.app.head.link.push({
            crossorigin: '',
            href: 'https://fonts.googleapis.com',
            rel: 'preconnect',
        });
    }

    if (resolvedModuleOptions.unpluginFonts.google.addPreloadLink) {
        const urlSearchParams = new URLSearchParams({ display: 'swap' });
        nuxt.options.unfonts?.google?.families.forEach((family) => {
            if (typeof family === 'string') urlSearchParams.append('family', family);
            else {
                if (family.styles) urlSearchParams.append('family', `${family.name}:${family.styles}`);
                else urlSearchParams.append('family', family.name);
            }
        });

        nuxt.options.app.head.link.push({
            as: 'style',
            href: `https://fonts.googleapis.com/css2?${decodeURIComponent(urlSearchParams.toString())}`,
            rel: 'preload',
        });
    }

    if (resolvedModuleOptions.unpluginFonts.google.noDefer && nuxt.options.unfonts?.google?.families) {
        nuxt.options.unfonts.google.families = nuxt.options.unfonts.google.families.map((family) => {
            if (typeof family === 'string') {
                return {
                    defer: false,
                    name: family,
                };
            }

            family.defer = false;
            return family;
        });
    }

    await installModule('unplugin-fonts/nuxt', {}, nuxt);
}

async function setupVueUse(nuxt: Nuxt) {
    await installModule('@vueuse/nuxt', {}, nuxt);
}
