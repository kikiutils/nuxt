import { defineNuxtModule } from '@nuxt/kit';

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
    defaults: {},
    meta: {
        compatibility: { nuxt: '>=3.13.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    setup(options, nuxt) {

    },
});
