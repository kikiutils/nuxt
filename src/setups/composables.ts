import { addImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../types/options';

export function setupComposables(moduleOptions: RequiredModuleOptions, resolver: Resolver) {
    if (!moduleOptions.enabledComposables) return;
    if (moduleOptions.enabledComposables.scroll) addImportsDir(resolver.resolve('runtime/composables/scroll'));
}
