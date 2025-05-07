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
    const imports = [];
    if (options.clipboard) imports.push('@kikiutils/shared/clipboard');
    if (options.datetime) imports.push('@kikiutils/shared/datetime');
    if (options.enhancedLocalStorage) imports.push('@kikiutils/shared/storage/enhanced/local');
    if (options.enum) imports.push('@kikiutils/shared/enum');
    if (options.general) imports.push('@kikiutils/shared/general');
    if (options.hash) imports.push('@kikiutils/shared/hash');
    if (options.math) imports.push('@kikiutils/shared/math');
    if (options.number) imports.push('@kikiutils/shared/number');
    if (options.random) imports.push('@kikiutils/shared/random');
    if (options.string) imports.push('@kikiutils/shared/string');
    if (options.url) imports.push('@kikiutils/shared/url');
    if (options.vue) imports.push('@kikiutils/shared/vue');
    if (options.web) imports.push('@kikiutils/shared/web');
    await Promise.all(imports.map(scanExportsAndAddImportsSources));
}

export async function setupAutoImportUtils(resolvedModuleOptions: ResolvedModuleOptions) {
    if (!resolvedModuleOptions.autoImportUtils) return;
    const promises = [];
    if (resolvedModuleOptions.autoImportUtils['@kikiutils/shared']) {
        promises.push(setupKikiutilsShared(resolvedModuleOptions.autoImportUtils['@kikiutils/shared']));
    }

    await Promise.all(promises);
}
