import { addImportsDir } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { ModuleOptions } from '../types/options';

export function setupDeepScanAutoImportDirs(options: ModuleOptions, nuxt: Nuxt) {
    if (!options.deepScanAutoImportDirs) return;

    if (options.deepScanAutoImportDirs.composables) addImportsDir(`${nuxt.options.srcDir}/composables/**/*.ts`);
    if (options.deepScanAutoImportDirs.globals) addImportsDir(`${nuxt.options.srcDir}/globals/**/*.ts`);
    if (options.deepScanAutoImportDirs.utils) addImportsDir(`${nuxt.options.srcDir}/utils/**/*.ts`);
}
