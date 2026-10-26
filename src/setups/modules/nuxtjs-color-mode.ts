import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { ModuleOptions as ColorModeOptions } from '@nuxtjs/color-mode';
import { defu } from 'defu';

export async function setup(nuxt: Nuxt) {
    const nuxtOptions = nuxt.options as Omit<Nuxt['options'], 'colorMode'> & {
        colorMode?: Partial<ColorModeOptions>;
    };

    const options = defu(
        nuxtOptions.colorMode,
        {
            classSuffix: '',
            preference: 'dark',
            storage: nuxt.options.ssr ? 'cookie' as const : 'localStorage' as const,
        },
    );

    nuxtOptions.colorMode = options;
    await installModule('@nuxtjs/color-mode', options, nuxt);
}
