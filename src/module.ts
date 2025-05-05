import { defineNuxtModule } from '@nuxt/kit';

import type { ModuleOptions } from './types/options';

export default defineNuxtModule<ModuleOptions>({
    // Default configuration options of the Nuxt module
    defaults: {},
    meta: {
        compatibility: { nuxt: '>=3.13.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    setup(options, nuxt) {},
});
