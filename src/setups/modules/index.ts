import type { Nuxt } from '@nuxt/schema';

import type { ModuleOptions } from '../../types/options';

export async function setupModules(options: ModuleOptions, nuxt: Nuxt) {
    if (!options.enabledModules) return;
    if (options.enabledModules.colorMode) await (await import('./nuxtjs-color-mode')).setup(nuxt);
    if (options.enabledModules.elementPlus) await (await import('./element-plus')).setup(nuxt);
    if (options.enabledModules.unpluginFonts) await (await import('./unplugin-fonts')).setup(nuxt);
}
