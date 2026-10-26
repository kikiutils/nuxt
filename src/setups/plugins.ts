import { addPlugin } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { ModuleOptions } from '../types/options';

export function setupPlugins(options: ModuleOptions, resolver: Resolver) {
    if (!options.enabledPlugins) return;

    if (options.enabledPlugins.preventDragFileDrop) {
        addPlugin({
            mode: 'client',
            src: resolver.resolve('runtime/plugins/prevent-drag-file-drop.client'),
        });
    }
}
