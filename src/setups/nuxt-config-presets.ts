import { join } from 'node:path';

import type { Nuxt } from '@nuxt/schema';

import type { ResolvedModuleOptions } from '../types/options';

// Constants
const packagesAllowedForStylesChunking = new Set([
    '@fortawesome/fontawesome-free',
    '@kikiutils/nuxt',
    'animate.css',
    'ant-design-vue',
    'antd',
    'bootstrap',
    'element-plus',
    'ionicons',
    'material-icons',
    'primevue',
    'quasar',
    'remixicon',
    'vue3-carousel',
    'vue3-marquee',
]);

// Functions
function extractPackageName(id: string) {
    const parts = id.split('node_modules/').pop()?.split('/');
    if (!parts) return;
    if (parts[0]?.startsWith('@')) return `${parts[0]}/${parts[1]}`;
    return parts[0];
}

export function setupNuxtConfigPresets(resolvedModuleOptions: ResolvedModuleOptions, nuxt: Nuxt) {
    if (resolvedModuleOptions.nuxtConfigPresets.viteAssetFileNames) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rollupOptions ||= {};
        nuxt.options.vite.build.rollupOptions.output ||= {};
        [nuxt.options.vite.build.rollupOptions.output].flat().forEach((output) => {
            output.assetFileNames ??= join(nuxt.options.app.buildAssetsDir, '[hash].[ext]').replace(/^\//, '');
        });
    }

    if (resolvedModuleOptions.nuxtConfigPresets.viteManualChunks) {
        nuxt.options.vite.build ||= {};
        nuxt.options.vite.build.rollupOptions ||= {};
        nuxt.options.vite.build.rollupOptions.output ||= {};
        [nuxt.options.vite.build.rollupOptions.output].flat().forEach((output) => {
            output.manualChunks ||= (id, { getModuleInfo }) => {
                if (!id.includes('node_modules') || id.startsWith('virtual:')) return;

                const packageName = extractPackageName(id);
                if (!packageName) return;

                // eslint-disable-next-line regexp/no-unused-capturing-group
                if (/\.(css|sass|scss)/.test(id)) {
                    // Only allow some packages to split their styles into dedicated chunks
                    if (!packagesAllowedForStylesChunking.has(packageName)) return;
                    return id.substring(id.lastIndexOf(packageName));
                }

                const moduleInfo = getModuleInfo(id);
                if (!moduleInfo) return;

                const importerPackageNames = new Set(
                    moduleInfo
                        .importers
                        .filter((id) => id.includes('node_modules') && !id.startsWith('virtual:'))
                        .map(extractPackageName),
                );

                if (importerPackageNames.has(packageName)) return packageName;
                return id.substring(id.lastIndexOf(packageName));
            };
        });
    }
}
