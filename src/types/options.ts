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
                /**
                 * @default true
                 */
                clipboard?: boolean;

                /**
                 * @default false
                 */
                datetime?: boolean;

                /**
                 * @default false
                 */
                elementPlus?: boolean;

                /**
                 * @default false
                 */
                enum?: boolean;

                /**
                 * @default true
                 */
                general?: boolean;

                /**
                 * @default false
                 */
                hash?: boolean;

                /**
                 * @default false
                 */
                math?: boolean;

                /**
                 * @default false
                 */
                number?: boolean;

                /**
                 * @default false
                 */
                object?: boolean;

                /**
                 * @default false
                 */
                random?: boolean;

                /**
                 * @default false
                 */
                string?: boolean;

                /**
                 * @default true
                 */
                url?: boolean;

                /**
                 * @default true
                 */
                vue?: boolean;

                /**
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

    /**
     * @default true
     */
    enabled?: boolean;
    enabledModules?:
      | false
      | {
          /**
           * @default false
           */
          colorMode?: boolean;

          /**
           * @default false
           */
          elementPlus?: boolean;

          /**
           * @default true
           */
          robots?: boolean;

          /**
           * @default false
           */
          security?: boolean;

          /**
           * @default true
           */
          unoCss?: boolean;

          /**
           * @default true
           */
          unpluginFonts?: boolean;

          /**
           * @default true
           */
          vueUse?: boolean;
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

    nuxtConfigPresets?: {
        viteAssetFileNames?: boolean;
        viteManualChunks?: {
            /**
             * Apply the recommended Vite manualChunks preset only if the user has not configured manualChunks.
             *
             * @default true
             */
            enabled?: boolean;
        };
    };

    unoCss?: {
        enabledResets?:
          | false
          | {
              /**
               * @default true
               */
              tailwind?: boolean;
          };
    };
}
