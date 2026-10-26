import type { Nuxt } from '@nuxt/schema';

import type { ModuleOptions } from '../../types/options';

export async function setupModules(options: ModuleOptions, nuxt: Nuxt) {
    if (!options.enabledModules) return;
    if (options.enabledModules.colorMode) await (await import('./nuxtjs-color-mode')).setup(nuxt);
}
