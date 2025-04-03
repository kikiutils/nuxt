import type { Nuxt } from '@nuxt/schema';
import type {
    Except,
    RequiredDeep,
} from 'type-fest';
import type removeConsole from 'vite-plugin-remove-console';

export type RequiredModuleOptions =
  & RequiredDeep<Except<ModuleOptions, 'nuxtOptions'>>
  & { nuxtOptions: ModuleOptions['nuxtOptions'] };

export interface ModuleOptions {
    elementPlus?: {
        enabledStyles?:
          | false
          | {
              /**
               * @default true
               */
              reboot?: boolean;
          };

        enabledUtils?:
          | false
          | {
              /**
               * @default true
               */
              form?: boolean;
          };
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
           * @default false
           */
          googleFonts?: boolean;

          /**
           * @default false
           */
          purgecss?: boolean;

          /**
           * @default false
           */
          robots?: boolean;

          /**
           * @default false
           */
          security?: boolean;

          /**
           * @default true
           */
          unocss?: boolean;

          /**
           * @default true
           */
          vueuse?: boolean;
      };

    enabledPlugins?:
      | false
      | {
          eventHandlers?:
            | false
            | {
                /**
                 * @default true
                 */
                dragAndDrop?: boolean;
            };
      };

    enabledServerUtils?:
      | false
      | {
          /**
           * @default false
           */
          datetime?: boolean;

          /**
           * @default true
           */
          error?: boolean;

          /**
           * @default false
           */
          hash?: boolean;

          /**
           * @default false
           */
          string?: boolean;
      };

    enabledStyles?:
      | false
      | {
          /**
           * @default false
           */
          font?: boolean;

          /**
           * @default true
           */
          reboot?: boolean;

          /**
           * @default false
           */
          scrollbar?: boolean;
      };

    enabledUtils?:
      | false
      | {
          /**
           * @default false
           */
          axios?: boolean;

          /**
           * @default false
           */
          clipboard?: boolean;

          /**
           * @default false
           */
          datetime?: boolean;

          /**
           * @default false
           */
          hash?: boolean;

          /**
           * @default false
           */
          string?: boolean;
      };

    enabledVitePlugins?:
      | false
      | {
          /**
           * @default true
           */
          removeConsole?: boolean;
      };

    /**
     * @default true
     */
    importAllComposablesDirTsFiles?: boolean;

    /**
     * @default true
     */
    importAllUtilsDirTsFiles?: boolean;

    /**
     * @default true
     */
    loadGlobalUtilsTypes?: boolean;
    nuxtOptions?: Pick<Nuxt['options'], 'devtools' | 'experimental' | 'nitro' | 'typescript' | 'vite'>;

    /**
     * @default { includes: ['log'] }
     */
    removeConsoleOptions?: Parameters<typeof removeConsole>[0];
    unocss?: {
        enabledReset?:
          | false
          | {
              /**
               * @default true
               */
              tailwind?: boolean;
          };
    };
}
