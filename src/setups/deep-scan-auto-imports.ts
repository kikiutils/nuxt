import { addImportsDir } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

export function setupDeepScanAutoImports(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (!resolvedModuleOptions.deepScanAutoImportDirs) return;
    if (resolvedModuleOptions.deepScanAutoImportDirs.composables) {
        addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);
    }

    if (resolvedModuleOptions.deepScanAutoImportDirs.globals) addImportsDir(`${nuxt.options.rootDir}/globals/**/*.ts`);
    if (resolvedModuleOptions.deepScanAutoImportDirs.utils) addImportsDir(`${nuxt.options.rootDir}/utils/**/*.ts`);
}
