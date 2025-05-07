import { addTypeTemplate } from '@nuxt/kit';

import type { ResolvedModuleOptions } from '../types/options';

export function setupGlobalTypeImports(resolvedModuleOptions: ResolvedModuleOptions) {
    if (!resolvedModuleOptions.globalTypeImports) return;
    const typeDeclarations: string[] = [];
    if (resolvedModuleOptions.globalTypeImports['@kikiutils/types/vue']) {
        typeDeclarations.push(`export type {} from '@kikiutils/types/vue';`);
    }

    if (!typeDeclarations.length) return;
    addTypeTemplate({
        filename: 'types/kikiutils-nuxt-global-type-imports.d.ts',
        getContents: () => `${typeDeclarations.sort().join('\n')}\n`,
    });
}
