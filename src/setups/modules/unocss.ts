import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { UnocssNuxtOptions } from '@unocss/nuxt';

export async function setup(nuxt: Nuxt) {
    const nuxtOptions: Nuxt['options'] & { unocss?: UnocssNuxtOptions } = nuxt.options;
    const options: UnocssNuxtOptions = {
        ...nuxtOptions.unocss,
        preflight: nuxtOptions.unocss?.preflight ?? true,
    };

    nuxtOptions.unocss = options;
    await installModule('@unocss/nuxt', options, nuxt);
}
