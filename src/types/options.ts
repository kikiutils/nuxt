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
                /** @default true */
                clipboard?: boolean;

                /**
                 * Requires `date-fns`.
                 *
                 * @default true
                 */
                datetime?: boolean;

                /**
                 * Requires Element Plus types.
                 *
                 * @default false
                 */
                elementPlus?: boolean;

                /**
                 * Requires `date-fns`.
                 *
                 * @default true
                 */
                enhancedDate?: boolean;

                /** @default true */
                enum?: boolean;

                /** @default true */
                general?: boolean;

                /**
                 * Requires `@noble/hashes`.
                 *
                 * @default false
                 */
                hash?: boolean;

                /**
                 * Requires `decimal.js`.
                 *
                 * @default false
                 */
                math?: boolean;

                /**
                 * Requires `millify`.
                 *
                 * @default false
                 */
                number?: boolean;

                /**
                 * Requires `decimal.js`.
                 *
                 * @default false
                 */
                precisionNumber?: boolean;

                /** @default true */
                random?: boolean;

                /** @default true */
                string?: boolean;

                /** @default true */
                time?: boolean;

                /** @default true */
                url?: boolean;

                /** @default true */
                vue?: boolean;

                /**
                 * Browser-only functions; call on the client.
                 *
                 * @default true
                 */
                web?: boolean;
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

    /** @default true */
    enabled?: boolean;
    enabledModules?:
      | false
      | {
          /** @default false */
          colorMode?: boolean;

          /** @default false */
          elementPlus?: boolean;
      };

    enabledPlugins?:
      | false
      | {
          /** @default true */
          preventDragFileDrop?: boolean;
      };

    enabledStyles?:
      | false
      | {
          /**
           * Autofill transition workaround.
           *
           * @default true
           */
          autofillOverride?: boolean;

          /** @default true */
          reboot?: boolean;

          /**
           * Global font rendering and tap highlight preferences.
           *
           * @default true
           */
          visualPreferences?: boolean;
      };

    /**
     * Override this module's configuration presets.
     * Priority: explicit overrides > module presets > native Nuxt configuration.
     */
    nuxtConfigOverrides?: {
        devtools?: Partial<NuxtOptions['devtools']>;
        experimental?: Partial<NuxtOptions['experimental']>;
        nitro?: Partial<NuxtOptions['nitro']>;
        typescript?: Partial<NuxtOptions['typescript']>;
        vite?: Partial<NuxtOptions['vite']>;
    };
}
