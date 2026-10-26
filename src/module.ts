import {
    createResolver,
    defineNuxtModule,
} from '@nuxt/kit';

import { setupAutoImportUtils } from './setups/auto-import-utils';
import { setupDeepScanAutoImportDirs } from './setups/deep-scan-auto-import-dirs';
import { setupModules } from './setups/modules';
import { setupNuxtConfigOverrides } from './setups/nuxt-config-overrides';
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
        enabled: true,
        enabledModules: {
            colorMode: false,
            elementPlus: false,
            robots: true,
            security: false,
            unoCss: true,
            unpluginFonts: true,
        },
        enabledPlugins: { preventDragFileDrop: true },
        enabledStyles: {
            autofillOverride: true,
            reboot: true,
            visualPreferences: true,
        },
        nuxtConfigOverrides: {
            devtools: { enabled: false },
            typescript: { typeCheck: true },
        },
    },
    meta: {
        compatibility: { nuxt: '>=4.5.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    moduleDependencies: { '@vueuse/nuxt': { version: '>=15.0.0' } },
    async setup(options, nuxt) {
        if (!options.enabled) return;

        const resolver = createResolver(import.meta.url);

        setupNuxtConfigOverrides(options, nuxt);
        await setupModules(options, nuxt);

        setupAutoImportUtils(options);
        setupDeepScanAutoImportDirs(options, nuxt);
        setupPlugins(options, resolver);
        setupStyles(options, nuxt, resolver);
    },
});
