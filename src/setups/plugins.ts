import { addPlugin } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import removeConsole from 'vite-plugin-remove-console';

import type { RequiredModuleOptions } from '../types/options';

export function setupPlugins(moduleOptions: RequiredModuleOptions, resolver: Resolver) {
    if (!moduleOptions.enabledPlugins) return;
    if (moduleOptions.enabledPlugins.eventHandlers) {
        if (moduleOptions.enabledPlugins.eventHandlers.dragAndDrop) {
            addPlugin({
                mode: 'client',
                src: resolver.resolve('runtime/plugins/event-handlers/drag-and-drop.client'),
            });
        }
    }
}

export function setupVitePlugins(
    {
        enabledVitePlugins,
        removeConsoleOptions,
    }: RequiredModuleOptions,
    nuxt: Nuxt,
) {
    if (!enabledVitePlugins || enabledVitePlugins?.removeConsole === false) return;
    nuxt.options.vite.plugins ||= [];
    nuxt.options.vite.plugins.push(removeConsole(removeConsoleOptions));
}
