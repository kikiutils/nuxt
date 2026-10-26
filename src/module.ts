import { defineNuxtModule } from '@nuxt/kit';

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
    defaults: {},
    meta: {
        compatibility: { nuxt: '>=4.5.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    setup(_options, _nuxt) {},
});
