export default defineNuxtConfig({
    compatibilityDate: '2100-01-01',
    kikiutilsNuxt: {
        autoImportUtils: {
            '@kikiutils/shared': {
                clipboard: true,
                datetime: true,
                elementPlus: true,
                enhancedLocalStorage: true,
                enum: true,
                general: true,
                hash: true,
                math: true,
                number: true,
                random: true,
                string: true,
                url: true,
                vue: true,
                web: true,
            },
        },
        enabled: true,
        enabledModules: {
            colorMode: true,
            elementPlus: true,
            robots: true,
            security: true,
            unoCss: true,
            unpluginFonts: true,
            vueUse: true,
        },
        enabledPlugins: { preventDragFileDrop: true },
        enabledStyles: { reboot: true },
        unoCss: { enabledResets: { tailwind: true } },
        unpluginFonts: {
            google: {
                addPreconnectLink: true,
                disableDeferAndAutoAddPreloadLink: true,
            },
        },
    },
    modules: ['../src/module'],
});
