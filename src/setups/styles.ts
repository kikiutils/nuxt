import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { ModuleOptions } from '../types/options';

export function setupStyles(options: ModuleOptions, nuxt: Nuxt, resolver: Resolver) {
    if (!options.enabledStyles) return;
    const styles: string[] = [];
    if (options.enabledStyles.reboot) styles.push(resolver.resolve('runtime/assets/css/reboot.css'));
    if (options.enabledStyles.visualPreferences) {
        styles.push(resolver.resolve('runtime/assets/css/visual-preferences.css'));
    }

    if (options.enabledStyles.autofillOverride) {
        styles.push(resolver.resolve('runtime/assets/css/autofill-override.css'));
    }

    nuxt.options.css.unshift(...styles);
}
