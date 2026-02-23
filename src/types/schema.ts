declare module '../../.nuxt/schema/nuxt.schema.d.ts' {
    export interface NuxtCustomSchema {
        colorMode?: import('@nuxtjs/color-mode').ModuleOptions;
        elementPlus?: Parameters<typeof import('@element-plus/nuxt').default>[0];
        unfonts?: false | Parameters<typeof import('unplugin-fonts/nuxt').default>[0];
    }
}
