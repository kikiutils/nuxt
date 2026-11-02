import type { NuxtOptions } from '@nuxt/schema';

export interface ModuleOptions {
    autoImportUtils?:
      | false
      | {
          '@kikiutils/shared'?:
            | false
            | {
                /**
                 * @defaultValue true
                 */
                clipboard?: boolean;

                /**
                 * Requires `date-fns`.
                 *
                 * @defaultValue true
                 */
                datetime?: boolean;

                /**
                 * Requires Element Plus types.
                 *
                 * @defaultValue false
                 */
                elementPlus?: boolean;

                /**
                 * Requires `date-fns`.
                 *
                 * @defaultValue true
                 */
                enhancedDate?: boolean;

                /**
                 * @defaultValue true
                 */
                enum?: boolean;

                /**
                 * @defaultValue true
                 */
                general?: boolean;

                /**
                 * Requires `@noble/hashes`.
                 *
                 * @defaultValue false
                 */
                hash?: boolean;

                /**
                 * Requires `decimal.js`.
                 *
                 * @defaultValue false
                 */
                math?: boolean;

                /**
                 * Requires `millify`.
                 *
                 * @defaultValue false
                 */
                number?: boolean;

                /**
                 * Requires `decimal.js`.
                 *
                 * @defaultValue false
                 */
                precisionNumber?: boolean;

                /**
                 * @defaultValue true
                 */
                random?: boolean;

                /**
                 * @defaultValue true
                 */
                string?: boolean;

                /**
                 * @defaultValue true
                 */
                time?: boolean;

                /**
                 * @defaultValue true
                 */
                url?: boolean;

                /**
                 * @defaultValue true
                 */
                vue?: boolean;

                /**
                 * Browser-only functions; call on the client.
                 *
                 * @defaultValue true
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
           * @defaultValue true
           */
          composables?: boolean;

          /**
           * @defaultValue true
           */
          globals?: boolean;

          /**
           * @defaultValue true
           */
          utils?: boolean;
      };

    /**
     * @defaultValue true
     */
    enabled?: boolean;
    enabledModules?:
      | false
      | {
          /**
           * @defaultValue false
           */
          colorMode?: boolean;

          /**
           * @defaultValue false
           */
          elementPlus?: boolean;

          /**
           * @defaultValue true
           */
          robots?: boolean;

          /**
           * @defaultValue false
           */
          security?: boolean;

          /**
           * @defaultValue true
           */
          unoCss?: boolean;

          /**
           * @defaultValue true
           */
          unpluginFonts?: boolean;
      };

    enabledPlugins?:
      | false
      | {
          /**
           * @defaultValue true
           */
          preventDragFileDrop?: boolean;
      };

    enabledStyles?:
      | false
      | {
          /**
           * Autofill transition workaround.
           *
           * @defaultValue true
           */
          autofillOverride?: boolean;

          /**
           * @defaultValue true
           */
          reboot?: boolean;

          /**
           * Global font rendering and tap highlight preferences.
           *
           * @defaultValue true
           */
          visualPreferences?: boolean;
      };

    /**
     * Override this module's configuration presets.
     * Priority: explicit overrides > module presets > native Nuxt configuration.
     */
    nuxtConfigOverrides?: {
        devtools?: Partial<NuxtOptions['devtools']>;
        nitro?: Partial<NuxtOptions['nitro']>;
        typescript?: Partial<NuxtOptions['typescript']>;
        vite?: Partial<NuxtOptions['vite']>;
    };
}
