import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

export async function setup(nuxt: Nuxt) {
    await installModule('@nuxtjs/robots', {}, nuxt);
}
