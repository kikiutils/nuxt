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

    if (
        resolvedModuleOptions.unpluginFonts.google.disableDeferAndAutoAddPreloadLink
        && nuxt.options.unfonts?.google?.families.length
    ) {
        const urlSearchParams = new URLSearchParams({ display: 'swap' });
        nuxt.options.unfonts.google.families.forEach((family) => {
            if (typeof family === 'string') urlSearchParams.append('family', family);
            else {
                family.defer = false;
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

    await installModule('unplugin-fonts/nuxt', {}, nuxt);
}

async function setupVueUse(nuxt: Nuxt) {
    await installModule('@vueuse/nuxt', {}, nuxt);
}

export async function setupModules(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (!resolvedModuleOptions.enabledModules) return;
    if (resolvedModuleOptions.enabledModules.colorMode) await setupColorMode(nuxt);
    if (resolvedModuleOptions.enabledModules.elementPlus) await setupElementPlus(nuxt);
    if (resolvedModuleOptions.enabledModules.robots) await setupRobots(nuxt);
    if (resolvedModuleOptions.enabledModules.security) await setupSecurity(nuxt);
    if (resolvedModuleOptions.enabledModules.unoCss) await setupUnoCss(resolvedModuleOptions, nuxt);
    if (resolvedModuleOptions.enabledModules.unpluginFonts) await setupUnpluginFonts(resolvedModuleOptions, nuxt);
    if (resolvedModuleOptions.enabledModules.vueUse) await setupVueUse(nuxt);
}
