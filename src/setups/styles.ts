import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { RequiredModuleOptions } from '../types/options';

function setupElementPlusStyles(
    { elementPlus: { enabledStyles } }: RequiredModuleOptions,
    nuxt: Nuxt,
    resolver: Resolver,
) {
    if (!enabledStyles) return;
    if (enabledStyles.reboot) nuxt.options.css.push(resolver.resolve('runtime/element-plus/assets/css/reboot.css'));
}

export function setupStyles(moduleOptions: RequiredModuleOptions, nuxt: Nuxt, resolver: Resolver) {
    if (moduleOptions.enabledModules && moduleOptions.enabledModules.elementPlus) {
        setupElementPlusStyles(moduleOptions, nuxt, resolver);
    }

    if (!moduleOptions.enabledStyles) return;
    if (moduleOptions.enabledStyles.font) nuxt.options.css.push(resolver.resolve('runtime/assets/css/font.css'));
    if (moduleOptions.enabledStyles.reboot) nuxt.options.css.push(resolver.resolve('runtime/assets/css/reboot.css'));
    if (moduleOptions.enabledStyles.scrollbar) {
        nuxt.options.css.push(resolver.resolve('runtime/assets/css/scrollbar.css'));
    }
}
