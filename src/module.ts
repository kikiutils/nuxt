import {
    addImportsDir,
    addTypeTemplate,
    createResolver,
    defineNuxtModule,
    useLogger,
} from '@nuxt/kit';

import { setupComposables } from './setups/composables';
import {
    setupColorMode,
    setupElementPlus,
    setupGoogleFonts,
    setupPurgecss,
    setupRobots,
    setupSecurity,
    setupUnocss,
    setupVueuse,
} from './setups/modules';
import {
    setupOptions,
    setupVitePlugins,
} from './setups/options';
import { setupPlugins } from './setups/plugins';
import { setupServerUtils } from './setups/server/utils';
import { setupStyles } from './setups/styles';
import type {
    ModuleOptions,
    RequiredModuleOptions,
} from './types/options';

export default defineNuxtModule<ModuleOptions>({
    defaults: {
        elementPlus: {
            enabledComposables: { form: true },
            enabledStyles: { reboot: true },
        },
        enabled: true,
        enabledComposables: {
            axios: false,
            clipboard: false,
            datetime: false,
            hash: false,
        },
        enabledModules: {
            colorMode: false,
            elementPlus: false,
            googleFonts: false,
            purgecss: false,
            robots: false,
            security: false,
            unocss: true,
            vueuse: true,
        },
        enabledPlugins: { eventHandlers: { dragAndDrop: true } },
        enabledServerUtils: {
            datetime: false,
            error: true,
            hash: false,
            string: false,
        },
        enabledStyles: {
            font: false,
            reboot: true,
            scrollbar: false,
        },
        enabledVitePlugins: { removeConsole: true },
        importAllComposablesDirTsFiles: true,
        importAllUtilsDirTsFiles: true,
        loadGlobalUtilsTypes: true,
        removeConsoleOptions: {
            includes: [
                'error',
                'info',
                'log',
                'warn',
            ],
        },
        unocss: { enabledReset: { tailwind: true } },
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

        // Add packages to vite optimizeDeps
        nuxt.options.vite.optimizeDeps ??= {};
        nuxt.options.vite.optimizeDeps.include ??= [];
        if (moduleOptions.enabledComposables && moduleOptions.enabledComposables.clipboard) {
            nuxt.options.vite.optimizeDeps.include.push('copy-to-clipboard');
        }

        // Composables
        setupComposables(moduleOptions, resolver);
        if (options.importAllComposablesDirTsFiles) addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);

        // Modules
        await setupColorMode(moduleOptions, nuxt);
        await setupElementPlus(moduleOptions, nuxt);
        await setupGoogleFonts(moduleOptions, nuxt);
        await setupPurgecss(moduleOptions, nuxt);
        await setupRobots(moduleOptions, nuxt);
        await setupSecurity(moduleOptions, nuxt);
        await setupUnocss(moduleOptions, nuxt);
        await setupVueuse(moduleOptions, nuxt);

        // Options
        setupOptions(moduleOptions, nuxt);

        // Plugins
        setupPlugins(moduleOptions, resolver);

        // Server utils
        setupServerUtils(moduleOptions, resolver);

        // Styles
        setupStyles(moduleOptions, nuxt, resolver);

        // Utils
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
