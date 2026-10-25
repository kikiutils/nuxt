import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

function setupReboot(nuxt: Nuxt, resolver: Resolver) {
    nuxt.options.css.push(resolver.resolve('runtime/assets/css/reboot.css'));
}

export function setupStyles(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt, resolver: Resolver) {
    if (!resolvedModuleOptions.enabledStyles) return;
    if (resolvedModuleOptions.enabledStyles.reboot) setupReboot(nuxt, resolver);
}
