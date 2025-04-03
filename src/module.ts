import {
    addImportsDir,
    addTypeTemplate,
    createResolver,
    defineNuxtModule,
    useLogger,
} from '@nuxt/kit';

import {
    setupColorMode,
    setupElementPlus,
    setupGoogleFonts,
    setupPurgecss,
    setupRobots,
    setupSecurity,
    setupUnoCss,
    setupVueUse,
} from './setups/modules';
import { setupOptions } from './setups/options';
import {
    setupPlugins,
    setupVitePlugins,
} from './setups/plugins';
import { setupServerUtils } from './setups/server/utils';
import { setupStyles } from './setups/styles';
import { setupUtils } from './setups/utils';
import type {
    ModuleOptions,
    RequiredModuleOptions,
} from './types/options';

export default defineNuxtModule<ModuleOptions>({
    defaults: {
        elementPlus: { enabledUtils: { form: true } },
        enabled: true,
        enabledModules: {
            colorMode: false,
            elementPlus: false,
            googleFonts: false,
            purgecss: false,
            robots: false,
            security: false,
            unoCss: true,
            vueUse: true,
        },
        enabledPlugins: { eventHandlers: { dragAndDrop: true } },
        enabledServerUtils: {
            datetime: false,
            error: true,
            hash: false,
            string: false,
        },
        enabledStyles: { reboot: true },
        enabledUtils: {
            clipboard: false,
            datetime: false,
            hash: false,
            string: false,
        },
        enabledVitePlugins: { removeConsole: true },
        importAllComposablesDirTsFiles: true,
        importAllUtilsDirTsFiles: true,
        loadGlobalUtilsTypes: true,
        removeConsoleOptions: { includes: ['log'] },
        unoCss: { enabledResets: { tailwind: true } },
    },
    meta: {
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    async setup(options, nuxt) {
        const logger = useLogger();
        if (!options.enabled) return logger.info('@kikiutils/nuxt module disabled.');
        logger.info('Initializing @kikiutils/nuxt module...');
        const moduleOptions = options as RequiredModuleOptions;
        const resolver = createResolver(import.meta.url);

        // Ensure vite optimizeDeps is defined
        nuxt.options.vite.optimizeDeps ??= {};
        nuxt.options.vite.optimizeDeps.include ??= [];

        // Composables
        if (options.importAllComposablesDirTsFiles) addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);

        // Modules
        await setupColorMode(moduleOptions, nuxt);
        await setupElementPlus(moduleOptions, nuxt);
        await setupGoogleFonts(moduleOptions, nuxt);
        await setupPurgecss(moduleOptions, nuxt);
        await setupRobots(moduleOptions, nuxt);
        await setupSecurity(moduleOptions, nuxt);
        await setupUnoCss(moduleOptions, nuxt);
        await setupVueUse(moduleOptions, nuxt);

        // Options
        setupOptions(moduleOptions, nuxt);

        // Plugins
        setupPlugins(moduleOptions, resolver);

        // Server utils
        setupServerUtils(moduleOptions, resolver);

        // Styles
        setupStyles(moduleOptions, nuxt, resolver);

        // Utils
        setupUtils(moduleOptions, nuxt, resolver);
        if (options.importAllUtilsDirTsFiles) addImportsDir(`${nuxt.options.rootDir}/utils/**/*.ts`);

        // Utils types
        if (moduleOptions.loadGlobalUtilsTypes) {
            addTypeTemplate({
                filename: 'types/global-utils.d.ts',
                getContents() {
                    return `export type {} from '@kikiutils/types';\nexport type {} from '@kikiutils/types/vue';`;
                },
            });
        }

        // Vite plugins
        setupVitePlugins(moduleOptions, nuxt);
        logger.success('@kikiutils/nuxt module initialization successful.');
    },
});
