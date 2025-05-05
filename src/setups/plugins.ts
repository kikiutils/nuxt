import type { Resolver } from '@nuxt/kit';
import { addPlugin } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

function setupPreventDragFileDrop(nuxt: Nuxt, resolver: Resolver) {
    addPlugin({
        mode: 'client',
        src: resolver.resolve('runtime/plugins/prevent-drag-file-drop.client'),
    });
}

export function setupPlugins(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt, resolver: Resolver) {
    if (!resolvedModuleOptions.enabledPlugins) return;
    if (resolvedModuleOptions.enabledPlugins.preventDragFileDrop) setupPreventDragFileDrop(nuxt, resolver);
}
