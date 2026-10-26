import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { UnocssNuxtOptions } from '@unocss/nuxt';

export async function setup(nuxt: Nuxt) {
    const nuxtOptions = nuxt.options as Omit<Nuxt['options'], 'unocss'> & {
        unocss?: false | UnocssNuxtOptions;
    };

    if (nuxtOptions.unocss === false) return;

    const options: UnocssNuxtOptions = {
        ...nuxtOptions.unocss,
        preflight: nuxtOptions.unocss?.preflight ?? true,
    };

    nuxtOptions.unocss = options;
    await installModule('@unocss/nuxt', options, nuxt);
}
