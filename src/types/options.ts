import type { RequiredDeep } from 'type-fest';

export type ResolvedModuleOptions = RequiredDeep<UserModuleOptions>;

// Module options TypeScript interface definition
export interface UserModuleOptions {
    /**
     * @default true
     */
    enabled?: boolean;
}
