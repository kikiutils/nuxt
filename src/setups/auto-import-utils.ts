import { addImportsSources } from '@nuxt/kit';
import { resolveModuleExportNames } from 'mlly';

import type { ResolvedModuleOptions } from '../types/options';

async function scanExportsAndAddImportsSources(moduleId: string) {
    const moduleExports = new Set(await resolveModuleExportNames(moduleId));
    moduleExports.delete('default');
    addImportsSources({
        from: moduleId,
        imports: [...moduleExports],
    });
}

async function setupKikiutilsShared(
    options: Exclude<Exclude<ResolvedModuleOptions['autoImportUtils'], boolean>['@kikiutils/shared'], boolean>,
) {
    if (options.clipboard) await scanExportsAndAddImportsSources('@kikiutils/shared/clipboard');
    if (options.datetime) await scanExportsAndAddImportsSources('@kikiutils/shared/datetime');
    if (options.enhancedLocalStorage) await scanExportsAndAddImportsSources('@kikiutils/shared/storage/enhanced/local');
    if (options.enum) await scanExportsAndAddImportsSources('@kikiutils/shared/enum');
    if (options.general) await scanExportsAndAddImportsSources('@kikiutils/shared/general');
    if (options.hash) await scanExportsAndAddImportsSources('@kikiutils/shared/hash');
    if (options.math) await scanExportsAndAddImportsSources('@kikiutils/shared/math');
    if (options.number) await scanExportsAndAddImportsSources('@kikiutils/shared/number');
    if (options.random) await scanExportsAndAddImportsSources('@kikiutils/shared/random');
    if (options.string) await scanExportsAndAddImportsSources('@kikiutils/shared/string');
    if (options.url) await scanExportsAndAddImportsSources('@kikiutils/shared/url');
    if (options.vue) await scanExportsAndAddImportsSources('@kikiutils/shared/vue');
    if (options.web) await scanExportsAndAddImportsSources('@kikiutils/shared/web');
}

export async function setupAutoImportUtils(resolvedModuleOptions: ResolvedModuleOptions) {
    if (!resolvedModuleOptions.autoImportUtils) return;
    if (resolvedModuleOptions.autoImportUtils['@kikiutils/shared']) {
        await setupKikiutilsShared(resolvedModuleOptions.autoImportUtils['@kikiutils/shared']);
    }
}
