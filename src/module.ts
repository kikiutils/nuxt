import {
    createResolver,
    defineNuxtModule,
    useLogger,
} from '@nuxt/kit';

import { setupAutoImportUtils } from './setups/auto-import-utils';
import { setupDeepScanAutoImports } from './setups/deep-scan-auto-imports';
import { setupModules } from './setups/modules';
import { setupNuxtConfigOverrides } from './setups/nuxt-config-overrides';
import { setupNuxtConfigPresets } from './setups/nuxt-config-presets';
import { setupPlugins } from './setups/plugins';
import { setupStyles } from './setups/styles';
import type {
    ResolvedModuleOptions,
    UserModuleOptions,
} from './types/options';

export default defineNuxtModule<UserModuleOptions>({
    // Default configuration options of the Nuxt module
    defaults: {
        autoImportUtils: {
            '@kikiutils/shared': {
                clipboard: true,
                datetime: false,
                elementPlus: false,
                enum: false,
                general: true,
                hash: false,
                math: false,
                number: false,
                object: false,
                random: false,
                string: false,
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
            unpluginFonts: false,
            vitePluginWebfontDl: true,
            vueUse: true,
        },
        enabledPlugins: { preventDragFileDrop: true },
        enabledStyles: { reboot: true },
        nuxtConfigPresets: {
            viteAssetFileNames: true,
            viteManualChunks: {
                enabled: true,
                packagesDisallowedForManualChunking: new Set(),
            },
        },
        unoCss: { enabledResets: { tailwind: true } },
        unpluginFonts: {
            google: {
                addPreconnectLink: true,
                addPreloadLink: false,
                noDefer: true,
            },
        },
    } satisfies ResolvedModuleOptions,
    meta: {
        compatibility: { nuxt: '>=3.13.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    async setup(_options, nuxt) {
        const options = _options as ResolvedModuleOptions;
        const logger = useLogger();
        if (!options.enabled) return logger.info('[@kikiutils/nuxt] Disabled');
        const startAt = performance.now();
        logger.info('[@kikiutils/nuxt] Initializing...');
        const resolver = createResolver(import.meta.url);

        // Setups
        setupNuxtConfigOverrides(options, nuxt);
        setupNuxtConfigPresets(options, nuxt);
        await setupAutoImportUtils(options);
        setupDeepScanAutoImports(options, nuxt);
        await setupModules(options, nuxt);
        setupPlugins(options, resolver);
        setupStyles(options, nuxt, resolver);

        logger.success(`[@kikiutils/nuxt] Initialized successfully in ${(performance.now() - startAt).toFixed(2)}ms`);
    },
});
