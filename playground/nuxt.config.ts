export default defineNuxtConfig({
    compatibilityDate: '2100-01-01',
    kikiutilsNuxt: {
        enabledModules: {
            colorMode: true,
            elementPlus: true,
            security: true,
        },
    },
    modules: ['../src/module'],
});
