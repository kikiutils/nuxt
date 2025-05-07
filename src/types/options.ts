import type { NuxtOptions } from '@nuxt/schema';
import type { RequiredDeep } from 'type-fest';

export type ResolvedModuleOptions =
  & Pick<UserModuleOptions, 'nuxtConfigOverrides'>
  & RequiredDeep<Omit<UserModuleOptions, 'nuxtConfigOverrides'>>;

// Module options TypeScript interface definition
export interface UserModuleOptions {
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
                enhancedLocalStorage?: boolean;
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

    globalTypeImports?:
      | false
      | {
          /**
           * @default true
           */
          '@kikiutils/types/vue'?: boolean;
      };

    nuxtConfigOverrides?: Partial<Pick<NuxtOptions, 'devtools' | 'experimental' | 'nitro' | 'typescript' | 'vite'>>;
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

    unpluginFonts?: {
        google?: {
            /**
             * @default true
             */
            addPreconnectLink?: boolean;
            /**
             * @default true
             */
            disableDeferAndAutoAddPreloadLink?: boolean;
        };
    };
}
