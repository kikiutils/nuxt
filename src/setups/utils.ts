import { addImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { RequiredModuleOptions } from '../types/options';

export function setupUtils(moduleOptions: RequiredModuleOptions, nuxt: Nuxt, resolver: Resolver) {
    if (moduleOptions.enabledModules && moduleOptions.enabledModules.elementPlus) {
        setupElementPlusUtils(moduleOptions, resolver);
    }

    if (!moduleOptions.enabledUtils) return;
    if (moduleOptions.enabledUtils.clipboard) {
        addImportsDir(resolver.resolve('runtime/utils/clipboard'));
        nuxt.options.vite.optimizeDeps!.include!.push('copy-to-clipboard');
    }

    if (moduleOptions.enabledUtils.datetime) addImportsDir(resolver.resolve('runtime/utils/datetime'));
    if (moduleOptions.enabledUtils.hash) addImportsDir(resolver.resolve('runtime/utils/hash'));
    if (moduleOptions.enabledUtils.string) addImportsDir(resolver.resolve('runtime/utils/string'));
}

function setupElementPlusUtils(
    { elementPlus: { enabledUtils } }: RequiredModuleOptions,
    resolver: Resolver,
) {
    if (!enabledUtils) return;
    if (enabledUtils.form) addImportsDir(resolver.resolve('runtime/element-plus/utils/form'));
}
