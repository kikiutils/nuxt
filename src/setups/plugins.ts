import type { Resolver } from '@nuxt/kit';
import { addPlugin } from '@nuxt/kit';

import type { ResolvedModuleOptions } from '../types/options';

function setupPreventDragFileDrop(resolver: Resolver) {
    addPlugin({
        mode: 'client',
        src: resolver.resolve('runtime/plugins/prevent-drag-file-drop.client'),
    });
}

export function setupPlugins(resolvedModuleOptions: ResolvedModuleOptions, resolver: Resolver) {
    if (!resolvedModuleOptions.enabledPlugins) return;
    if (resolvedModuleOptions.enabledPlugins.preventDragFileDrop) setupPreventDragFileDrop(resolver);
}
