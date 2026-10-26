import type { ModuleOptions as ElementPlusOptions } from '@element-plus/nuxt';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

export async function setup(nuxt: Nuxt) {
    const nuxtOptions: Nuxt['options'] & { elementPlus?: Partial<ElementPlusOptions> } = nuxt.options;
    const options: Partial<ElementPlusOptions> = {
        ...nuxtOptions.elementPlus,
        themes: nuxtOptions.elementPlus?.themes ?? ['dark'],
    };

    nuxtOptions.elementPlus = options;
    await installModule('@element-plus/nuxt', options, nuxt);
}
