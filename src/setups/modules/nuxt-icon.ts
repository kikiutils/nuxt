import { existsSync } from 'node:fs';
import { join } from 'node:path';

import type { ModuleOptions as IconOptions } from '@nuxt/icon';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';

export async function setup(nuxt: Nuxt) {
    const nuxtOptions = nuxt.options as Omit<Nuxt['options'], 'icon'> & {
        icon?: false | Partial<IconOptions>;
    };

    if (nuxtOptions.icon === false) return;

    const customCollectionDir = join(nuxt.options.srcDir, 'assets/icons');
    const options = defu(
        nuxtOptions.icon,
        {
            clientBundle: { includeCustomCollections: true },
            componentName: 'NuxtIcon',
            customCollections: existsSync(customCollectionDir)
                ? [
                    {
                        dir: customCollectionDir,
                        prefix: 'icon',
                        recursive: true,
                    },
                ]
                : [],
            localApiEndpoint: `${nuxt.options.nitro.apiBaseURL || '/api'}/_nuxt_icon`,
            mode: 'svg' as const,
        },
    );

    nuxtOptions.icon = options;
    await installModule('@nuxt/icon', options, nuxt);
}
