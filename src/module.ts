import {
    createResolver,
    defineNuxtModule,
    useLogger,
} from '@nuxt/kit';

import { setupModules } from './setups/modules';
import type {
    ResolvedModuleOptions,
    UserModuleOptions,
} from './types/options';

export default defineNuxtModule<UserModuleOptions>({
    // Default configuration options of the Nuxt module
    defaults: {
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

        // Modules
        await setupModules(options, nuxt);

        logger.success('@kikiutils/nuxt initialized successfully.');
    },
});
