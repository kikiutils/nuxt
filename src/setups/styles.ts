import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { RequiredModuleOptions } from '../types/options';

export function setupStyles(moduleOptions: RequiredModuleOptions, nuxt: Nuxt, resolver: Resolver) {
    if (!moduleOptions.enabledStyles) return;
    if (moduleOptions.enabledStyles.reboot) nuxt.options.css.push(resolver.resolve('runtime/assets/css/reboot.css'));
}
