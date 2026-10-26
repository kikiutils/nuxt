import type { NuxtOptions } from '@nuxt/schema';
import type { RequiredDeep } from 'type-fest';

export type ResolvedModuleOptions =
  & Pick<ModuleOptions, 'nuxtConfigOverrides'>
  & RequiredDeep<Omit<ModuleOptions, 'nuxtConfigOverrides'>>;

// Module options TypeScript interface definition
export interface ModuleOptions {
    autoImportUtils?:
      | false
      | {
          '@kikiutils/shared'?:
            | false
            | {

            };
      };

    /**
     * Deep scan and auto-import `.ts` files from selected directories.
     */
    deepScanAutoImportDirs?:
      | false
      | {
          /**
           * @default true
           */
          composables?: boolean;

          /**
           * @default true
           */
          globals?: boolean;

          /**
           * @default true
           */
          utils?: boolean;
      };

    /**
     * @default true
     */
    enabled?: boolean;
    enabledModules?:
      | false
      | {

      };

    enabledPlugins?:
      | false
      | {
          /**
           * @default true
           */
          preventDragFileDrop?: boolean;
      };

    enabledStyles?:
      | false
      | {
          /**
           * @default true
           */
          reboot?: boolean;
      };

    nuxtConfigOverrides?: {
        devtools?: Partial<NuxtOptions['devtools']>;
        experimental?: Partial<NuxtOptions['experimental']>;
        nitro?: Partial<NuxtOptions['nitro']>;
        typescript?: Partial<NuxtOptions['typescript']>;
        vite?: Partial<NuxtOptions['vite']>;
    };

    nuxtConfigPresets?: { viteAssetFileNames?: boolean };
}
