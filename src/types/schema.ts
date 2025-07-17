declare module '../../.nuxt/schema/nuxt.schema.d.ts' {
    export interface NuxtCustomSchema {
        colorMode?: import('@nuxtjs/color-mode').ModuleOptions;
        unfonts?: Parameters<typeof import('unplugin-fonts/nuxt').default>[0];
    }
}
