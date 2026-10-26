import { addImportsSources } from '@nuxt/kit';

import type { ModuleOptions } from '../types/options';

type AutoImportUtilsOptions = Exclude<ModuleOptions['autoImportUtils'], boolean | undefined>;
type KikiutilsSharedAutoImportOptions = Exclude<AutoImportUtilsOptions['@kikiutils/shared'], boolean | undefined>;

// Constants/Variables
const kikiutilsSharedImportSources: Record<keyof KikiutilsSharedAutoImportOptions, string> = {
    clipboard: '@kikiutils/shared/clipboard',
    datetime: '@kikiutils/shared/datetime',
    elementPlus: '@kikiutils/shared/element-plus',
    enhancedDate: '@kikiutils/shared/classes/enhanced-date',
    enum: '@kikiutils/shared/enum',
    general: '@kikiutils/shared/general',
    hash: '@kikiutils/shared/hash',
    math: '@kikiutils/shared/math',
    number: '@kikiutils/shared/number',
    precisionNumber: '@kikiutils/shared/classes/precision-number',
    random: '@kikiutils/shared/random',
    string: '@kikiutils/shared/string',
    time: '@kikiutils/shared/time',
    url: '@kikiutils/shared/url',
    vue: '@kikiutils/shared/vue',
    web: '@kikiutils/shared/web',
};

// Functions
export function setupAutoImportUtils(options: ModuleOptions) {
    if (!options.autoImportUtils) return;

    // @kikiutils/shared
    const kikiutilsSharedOptions = options.autoImportUtils['@kikiutils/shared'];
    if (!kikiutilsSharedOptions) return;
    for (const key of Object.keys(kikiutilsSharedImportSources) as (keyof KikiutilsSharedAutoImportOptions)[]) {
        if (kikiutilsSharedOptions[key]) {
            addImportsSources({
                ignore: ['default'],
                package: kikiutilsSharedImportSources[key],
                url: import.meta.url,
            });
        }
    }
}
