import type { ModuleOptions as ElementPlusModuleOptions } from '@element-plus/nuxt';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { ModuleOptions as ColorModeModuleOptions } from '@nuxtjs/color-mode';
import type { ModuleOptions as GoogleFontsModuleOptions } from '@nuxtjs/google-fonts';
import { defu } from 'defu';

import type { RequiredModuleOptions } from '../types/options';

export async function setupColorMode({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.colorMode) return;
    // @ts-expect-error Ignore this error.
    nuxt.options.colorMode = defu<ColorModeModuleOptions, Partial<ColorModeModuleOptions>[]>(
        // @ts-expect-error Ignore this error.
        nuxt.options.colorMode,
        {
            classSuffix: '',
            preference: 'dark',
        },
    );

    await installModule('@nuxtjs/color-mode', {}, nuxt);
}

export async function setupElementPlus({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.elementPlus) return;
    nuxt.options.elementPlus = defu<ElementPlusModuleOptions, Partial<ElementPlusModuleOptions>[]>(
        nuxt.options.elementPlus,
        { themes: ['dark'] },
    );

    await installModule('@element-plus/nuxt', {}, nuxt);
}

export async function setupGoogleFonts({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.googleFonts) return;
    // @ts-expect-error Ignore this error.
    nuxt.options.googleFonts = defu<GoogleFontsModuleOptions, GoogleFontsModuleOptions[]>(
        // @ts-expect-error Ignore this error.
        nuxt.options.googleFonts,
        {
            display: 'swap',
            download: false,
        },
    );

    await installModule('@nuxtjs/google-fonts', {}, nuxt);
}

export async function setupPurgecss({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.purgecss) return;
    nuxt.options.purgecss ||= {};
    const originalSafelist = nuxt.options.purgecss.safelist;
    const safelistOptions: { deep: RegExp[]; standard: (RegExp | string)[] } = {
        deep: [],
        standard: [
            /-(appear|enter|leave)(-(active|from|to))?$/,
            /.*data-v-.*/,
            /:deep/,
            /:global/,
            /:slotted/,
            /^(?!cursor-move).+-move$/,
            /^nuxt-link(-exact)?-active$/,
            '__nuxt',
            'body',
            'html',
            'nuxt-progress',
        ],
    };

    if (enabledModules.unocss) {
        safelistOptions.standard.push(
            /!$/,
            /--unocss--/,
            /-\[\S+\]/,
            /__uno_hash_(\w{6})/,
        );
    }

    if (Array.isArray(originalSafelist)) {
        safelistOptions.standard.push(...originalSafelist);
    } else if (originalSafelist) {
        safelistOptions.deep.push(...originalSafelist.deep || []);
        safelistOptions.standard.push(...originalSafelist.standard || []);
    }

    safelistOptions.deep = [...new Set(safelistOptions.deep)];
    safelistOptions.standard = [...new Set(safelistOptions.standard)];
    nuxt.options.purgecss.safelist = safelistOptions;
    await installModule('nuxt-purgecss', {}, nuxt);
}

export async function setupRobots({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.robots) return;
    await installModule('@nuxtjs/robots', {}, nuxt);
}

export async function setupSecurity({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.security) return;
    await installModule('nuxt-security', {}, nuxt);
}

export async function setupUnocss(
    {
        enabledModules,
        unocss,
    }: RequiredModuleOptions,
    nuxt: Nuxt,
) {
    if (!enabledModules || !enabledModules.unocss) return;
    if (unocss.enabledReset && unocss.enabledReset.tailwind) nuxt.options.css.push('@unocss/reset/tailwind.css');
    await installModule('@unocss/nuxt', {}, nuxt);
}

export async function setupVueuse({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) {
    if (!enabledModules || !enabledModules.vueuse) return;
    await installModule('@vueuse/nuxt', {}, nuxt);
}
