import type { RequiredDeep } from 'type-fest';

export type ResolvedModuleOptions = RequiredDeep<UserModuleOptions>;

// Module options TypeScript interface definition
export interface UserModuleOptions {
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
