import {
    addImportsDir,
    createResolver,
    defineNuxtModule,
    useLogger,
} from '@nuxt/kit';

import { setupAutoImportUtils } from './setups/auto-import-utils';
import { setupGlobalTypeImports } from './setups/global-type-imports';
import { setupModules } from './setups/modules';
import { setupNuxtConfigOverrides } from './setups/nuxt-config-overrides';
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
                enhancedLocalStorage: false,
                enum: false,
                general: true,
                hash: false,
                math: false,
                number: false,
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
            unpluginFonts: true,
            vueUse: true,
        },
        enabledPlugins: { preventDragFileDrop: true },
        enabledStyles: { reboot: true },
        globalTypeImports: { '@kikiutils/types/vue': true },
        unoCss: { enabledResets: { tailwind: true } },
        unpluginFonts: {
            google: {
                addPreconnectLink: true,
                disableDeferAndAutoAddPreloadLink: true,
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
        if (!options.enabled) return logger.info('@kikiutils/nuxt is disabled.');
        logger.info('Initializing @kikiutils/nuxt...');
        const resolver = createResolver(import.meta.url);

        // Deep scan auto imports
        if (options.deepScanAutoImportDirs) {
            if (options.deepScanAutoImportDirs.composables) {
                addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);
            }

            if (options.deepScanAutoImportDirs.globals) addImportsDir(`${nuxt.options.rootDir}/globals/**/*.ts`);
            if (options.deepScanAutoImportDirs.utils) addImportsDir(`${nuxt.options.rootDir}/utils/**/*.ts`);
        }

        await setupAutoImportUtils(options);
        setupGlobalTypeImports(options);
        await setupModules(options, nuxt);
        setupNuxtConfigOverrides(options, nuxt);
        setupPlugins(options, resolver);
        setupStyles(options, nuxt, resolver);

        logger.success('@kikiutils/nuxt initialized successfully.');
    },
});
