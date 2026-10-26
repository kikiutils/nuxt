import { defineNuxtModule } from '@nuxt/kit';

import { setupDeepScanAutoImportDirs } from './setups/deep-scan-auto-import-dirs';
import type { ModuleOptions } from './types/options';

export type { ModuleOptions } from './types/options';

export default defineNuxtModule<ModuleOptions>({
    defaults: {
        deepScanAutoImportDirs: {
            composables: true,
            globals: true,
            utils: true,
        },
    },
    meta: {
        compatibility: { nuxt: '>=4.5.0' },
        configKey: 'kikiutilsNuxt',
        name: '@kikiutils/nuxt',
    },
    setup(options, nuxt) {
        setupDeepScanAutoImportDirs(options, nuxt);
    },
});
