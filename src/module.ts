import {
    createResolver,
    defineNuxtModule,
} from '@nuxt/kit';

import { setupAutoImportUtils } from './setups/auto-import-utils';
import { setupDeepScanAutoImportDirs } from './setups/deep-scan-auto-import-dirs';
import { setupPlugins } from './setups/plugins';
import { setupStyles } from './setups/styles';
import type { ModuleOptions } from './types/options';

export type { ModuleOptions } from './types/options';

export default defineNuxtModule<ModuleOptions>({
    defaults: {
        autoImportUtils: {
            '@kikiutils/shared': {
                clipboard: true,
                datetime: true,
                elementPlus: false,
                enhancedDate: true,
                enum: true,
                general: true,
                hash: false,
                math: false,
                number: false,
                precisionNumber: false,
                random: true,
                string: true,
                time: true,
                url: true,
                vue: true,
                web: true,
            },
        },
        deepScanAutoImportDirs: {
            composables: true,
            globals: true,
            utils: true,
        },
        enabledPlugins: { preventDragFileDrop: true },
        enabledStyles: {
            autofillOverride: true,
            reboot: true,
            visualPreferences: true,
        },
    },
    meta: {
        compatibility: { nuxt: '>=4.5.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    moduleDependencies: { '@vueuse/nuxt': { version: '>=15.0.0' } },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);

        setupAutoImportUtils(options);
        setupDeepScanAutoImportDirs(options, nuxt);
        setupPlugins(options, resolver);
        setupStyles(options, nuxt, resolver);
    },
});
