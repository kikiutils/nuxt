# Changelog

## v10.3.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.3.0...v10.3.1)

### 🩹 Fixes

- Adjust `customExports` order in `tsdown.config` to move wildcard (`*`) exports to the end ([0b3f357](https://github.com/kikiutils/nuxt/commit/0b3f357))

### 🏡 Chore

- Update logger message ([bac06d3](https://github.com/kikiutils/nuxt/commit/bac06d3))
- Update deps ([9a89edd](https://github.com/kikiutils/nuxt/commit/9a89edd))
- Enable `nitro.compressPublicAssets` and `nitro.minify` only when `NODE_ENV` is `production` ([8fffbbb](https://github.com/kikiutils/nuxt/commit/8fffbbb))

### ❤️ Contributors

- Kiki-kanri

## v10.3.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.2.0...v10.3.0)

### 🚀 Enhancements

- Add `nuxt-vite-plugin-webfont-dl` module and disable `unpluginFonts` by default ([953cb6e](https://github.com/kikiutils/nuxt/commit/953cb6e))

### 🏡 Chore

- Remove playground pnpm lock and update package.json ([850f57a](https://github.com/kikiutils/nuxt/commit/850f57a))
- Upgrade deps ([9695f6f](https://github.com/kikiutils/nuxt/commit/9695f6f))
- Enable all module in playground ([ca4c417](https://github.com/kikiutils/nuxt/commit/ca4c417))

### ❤️ Contributors

- Kiki-kanri

## v10.2.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.1.0...v10.2.0)

### 🚀 Enhancements

- Auto-select `cookie` or `localStorage` storage for `colorMode` based on SSR mode ([3452c4d](https://github.com/kikiutils/nuxt/commit/3452c4d))

### 🏡 Chore

- Upgrade deps ([41495ad](https://github.com/kikiutils/nuxt/commit/41495ad))

### ❤️ Contributors

- Kiki-kanri

## v10.1.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.0.4...v10.1.0)

### 🚀 Enhancements

- Rename `packagesDisallowedForManualChunking` to `defaultPackagesDisallowedForManualChunking` and add `@nuxt/image` to set, add `nuxtConfigPresets.viteManualChunks.packagesDisallowedForManualChunking` to allow extend packages set ([eb776cc](https://github.com/kikiutils/nuxt/commit/eb776cc))

### ❤️ Contributors

- Kiki-kanri

## v10.0.4

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.0.3...v10.0.4)

### 🩹 Fixes

- In `manualChunks.getSizeBasedPackageChunkName`, remove query from `id` before `stat` check and wrap logic in try/catch to prevent build crashes ([fc2e39f](https://github.com/kikiutils/nuxt/commit/fc2e39f))

### ❤️ Contributors

- Kiki-kanri

## v10.0.3

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.0.2...v10.0.3)

### 🏡 Chore

- Skip processing for certain packages in `manualChunks` ([5ff3f62](https://github.com/kikiutils/nuxt/commit/5ff3f62))

### ❤️ Contributors

- Kiki-kanri

## v10.0.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.0.1...v10.0.2)

### 🩹 Fixes

- Skip `nuxt` package in `manualChunks` to let Rollup handle it automatically ([f7ded62](https://github.com/kikiutils/nuxt/commit/f7ded62))

### 💅 Refactors

- Remove `packagesKnownNoCircularImport` check from `manualChunks` ([d3bef17](https://github.com/kikiutils/nuxt/commit/d3bef17))

### ❤️ Contributors

- Kiki-kanri

## v10.0.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v10.0.0...v10.0.1)

### 🩹 Fixes

- Address `manualChunks` issues ([d2ab07b](https://github.com/kikiutils/nuxt/commit/d2ab07b))

### ❤️ Contributors

- Kiki-kanri

## v10.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.9...v10.0.0)

### 🔥 Performance

- Update Vite `manualChunks` to auto-group chunks by size to avoid excessive fragmentation ([a82d57f](https://github.com/kikiutils/nuxt/commit/a82d57f))

### 💅 Refactors

- ⚠️  Control Vite Rollup `assetFileNames` and `manualChunks` via `nuxtConfigPresets` option ([ef4aae0](https://github.com/kikiutils/nuxt/commit/ef4aae0))

### 🏡 Chore

- Update `packagesAllowedForStylesChunking` list ([b237eda](https://github.com/kikiutils/nuxt/commit/b237eda))
- Tidy up logger messages ([ab40d2d](https://github.com/kikiutils/nuxt/commit/ab40d2d))
- Upgrade deps ([b88fdc9](https://github.com/kikiutils/nuxt/commit/b88fdc9))

#### ⚠️ Breaking Changes

- ⚠️  Control Vite Rollup `assetFileNames` and `manualChunks` via `nuxtConfigPresets` option ([ef4aae0](https://github.com/kikiutils/nuxt/commit/ef4aae0))

### ❤️ Contributors

- Kiki-kanri

## v9.0.9

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.8...v9.0.9)

### 🏡 Chore

- Selectively enable styles chunk splitting for some packages ([a69ecef](https://github.com/kikiutils/nuxt/commit/a69ecef))

### ❤️ Contributors

- Kiki-kanri

## v9.0.8

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.7...v9.0.8)

### 🩹 Fixes

- Remove `assetFileNames` to resolve CSS loading order issues ([5334570](https://github.com/kikiutils/nuxt/commit/5334570))

### ❤️ Contributors

- Kiki-kanri

## v9.0.7

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.6...v9.0.7)

### 🔥 Performance

- Optimize manualChunks configuration to split more modules ([2980c19](https://github.com/kikiutils/nuxt/commit/2980c19))

### ❤️ Contributors

- Kiki-kanri

## v9.0.6

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.5...v9.0.6)

### 🏡 Chore

- Update deps and remove `autoImportUtils.@kikiutils/shared.enhancedLocalStorage` option ([b114898](https://github.com/kikiutils/nuxt/commit/b114898))

### ❤️ Contributors

- Kiki-kanri

## v9.0.5

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.4...v9.0.5)

### 🏡 Chore

- Set `assetFileNames` to remove original source filenames from output in nuxt config overrides `rollupOptions` ([ff6c1b0](https://github.com/kikiutils/nuxt/commit/ff6c1b0))

### ❤️ Contributors

- Kiki-kanri

## v9.0.4

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.3...v9.0.4)

### 🩹 Fixes

- Revert `manualChunks` logic for non-style files to previous behavior ([669bcfa](https://github.com/kikiutils/nuxt/commit/669bcfa))

### ❤️ Contributors

- Kiki-kanri

## v9.0.3

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.2...v9.0.3)

### 🔥 Performance

- Optimize `manualChunks` configuration to split more modules ([3c47ed8](https://github.com/kikiutils/nuxt/commit/3c47ed8))

### 🏡 Chore

- Upgrade deps ([fbbd690](https://github.com/kikiutils/nuxt/commit/fbbd690))
- Remove `build.config.ts` ([8b3bfb5](https://github.com/kikiutils/nuxt/commit/8b3bfb5))
- Lint css file ([376b03d](https://github.com/kikiutils/nuxt/commit/376b03d))

### ❤️ Contributors

- Kiki-kanri

## v9.0.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.1...v9.0.2)

### 🏡 Chore

- Update tsdown config ([59407a9](https://github.com/kikiutils/nuxt/commit/59407a9))
- Disable tsdown `fixedExtension` config ([9039405](https://github.com/kikiutils/nuxt/commit/9039405))
- Update eslint config ([e75c3d7](https://github.com/kikiutils/nuxt/commit/e75c3d7))
- Add missing dev deps ([a243d91](https://github.com/kikiutils/nuxt/commit/a243d91))

### ❤️ Contributors

- Kiki-kanri

## v9.0.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v9.0.0...v9.0.1)

### 💅 Refactors

- Rename func parameters in `arr.map` and similar methods to `item` for consistency ([c5768ac](https://github.com/kikiutils/nuxt/commit/c5768ac))
- Tidy up code ([1a92f2c](https://github.com/kikiutils/nuxt/commit/1a92f2c))

### 🏡 Chore

- Add `.editorconfig` ([11056ce](https://github.com/kikiutils/nuxt/commit/11056ce))
- Upgrade dependencies ([4aa28e0](https://github.com/kikiutils/nuxt/commit/4aa28e0))
- Upgrade devDependencies ([aca04e8](https://github.com/kikiutils/nuxt/commit/aca04e8))
- Replace `@kikiutils/changelogen` with `changelogen` ([8d1d648](https://github.com/kikiutils/nuxt/commit/8d1d648))
- Update script ([44312fb](https://github.com/kikiutils/nuxt/commit/44312fb))
- Update `pnpm.onlyBuiltDependencies` ([9788a78](https://github.com/kikiutils/nuxt/commit/9788a78))
- Upgrade dependencies ([225bf46](https://github.com/kikiutils/nuxt/commit/225bf46))
- Replace `@kikiutils/changelogen` with `changelogen` ([0771b20](https://github.com/kikiutils/nuxt/commit/0771b20))

### 🤖 CI

- Update config file ([cfba23c](https://github.com/kikiutils/nuxt/commit/cfba23c))

### ❤️ Contributors

- Kiki-kanri

## v9.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v8.2.0...v9.0.0)

### 🩹 Fixes

- Ensure tsdown `customExports` returns after deleting keys containing internals ([7324bab](https://github.com/kikiutils/nuxt/commit/7324bab))

### 💅 Refactors

- ⚠️ Remove `setupGlobalTypeImports` and related codes ([85c8fdf](https://github.com/kikiutils/nuxt/commit/85c8fdf))

### 📦 Build

- Update tsdown config to treat all dependencies as external ([f5e4f7a](https://github.com/kikiutils/nuxt/commit/f5e4f7a))
- Update tsdown customExports to remove entries with keys containing "internals" ([59b1622](https://github.com/kikiutils/nuxt/commit/59b1622))
- Update tsdown entry ([2e67d6b](https://github.com/kikiutils/nuxt/commit/2e67d6b))
- Set tsdown external from package.json instead of using wildcard * ([7dc5f28](https://github.com/kikiutils/nuxt/commit/7dc5f28))
- Update `customExports` rules to enable IDE import hints for package usage ([e4111c0](https://github.com/kikiutils/nuxt/commit/e4111c0))
- Update `customExports` rules to enable IDE import hints for package usage ([fa88888](https://github.com/kikiutils/nuxt/commit/fa88888))

### 🏡 Chore

- Remove alias config ([e353604](https://github.com/kikiutils/nuxt/commit/e353604))
- Change `update-peer-dependencies-meta.ts` to non-executable permission file ([62a7690](https://github.com/kikiutils/nuxt/commit/62a7690))
- Update base tsconfig ([26f4158](https://github.com/kikiutils/nuxt/commit/26f4158))
- Upgrade dependencies ([68ab61b](https://github.com/kikiutils/nuxt/commit/68ab61b))

#### ⚠️ Breaking Changes

- ⚠️ Remove `setupGlobalTypeImports` and related codes ([85c8fdf](https://github.com/kikiutils/nuxt/commit/85c8fdf))

### ❤️ Contributors

- kiki-kanri

## v8.2.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v8.1.0...v8.2.0)

Drop support for Node.js 20.

### 🚀 Enhancements

- Add `update-peer-dependencies-meta.ts` ([643c006](https://github.com/kikiutils/nuxt/commit/643c006))

### 📖 Documentation

- Update README ([63ba464](https://github.com/kikiutils/nuxt/commit/63ba464))

### 🏡 Chore

- **ci:** Remove pnpm cache configure in workflow ([abc0801](https://github.com/kikiutils/nuxt/commit/abc0801))
- Upgrade devDependencies ([57244a0](https://github.com/kikiutils/nuxt/commit/57244a0))
- Update eslint config ([99cd82e](https://github.com/kikiutils/nuxt/commit/99cd82e))
- Update eslint config ([09d584b](https://github.com/kikiutils/nuxt/commit/09d584b))
- Update all scripts ([fa5e797](https://github.com/kikiutils/nuxt/commit/fa5e797))
- Set minimum supported version to 22.12.0 ([76e8cc1](https://github.com/kikiutils/nuxt/commit/76e8cc1))

### ✅ Tests

- Fix vitest config to correctly load tsconfig and aliases ([0522f79](https://github.com/kikiutils/nuxt/commit/0522f79))

### ❤️ Contributors

- kiki-kanri

## v8.1.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v8.0.1...v8.1.0)

### 🚀 Enhancements

- Add `object` into `autoImportUtils.'@kikiutils/shared'` option ([f91128f](https://github.com/kikiutils/nuxt/commit/f91128f))

### 🏡 Chore

- Bump tsconfig target to es2023 ([b9185b7](https://github.com/kikiutils/nuxt/commit/b9185b7))
- Update `.gitignore` ([1465997](https://github.com/kikiutils/nuxt/commit/1465997))
- **ci:** Configure pnpm cache in workflow ([79e2264](https://github.com/kikiutils/nuxt/commit/79e2264))
- Upgrade dependencies ([a4c3a0f](https://github.com/kikiutils/nuxt/commit/a4c3a0f))
- Align Node.js version requirement with nuxt package.json ([085b069](https://github.com/kikiutils/nuxt/commit/085b069))
- Set `peerDependencies` and `peerDependenciesMeta` in `package.json` ([11bb4a9](https://github.com/kikiutils/nuxt/commit/11bb4a9))

### ❤️ Contributors

- kiki-kanri

## v8.0.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v8.0.0...v8.0.1)

### 🩹 Fixes

- Set `NuxtCustomSchema.unfonts` type ([3be64cd](https://github.com/kikiutils/nuxt/commit/3be64cd))
- Handle `unpluginFonts` google families correctly when `noDefer` is true and family is a string ([587687f](https://github.com/kikiutils/nuxt/commit/587687f))

### 🏡 Chore

- Update typecheck script ([285b752](https://github.com/kikiutils/nuxt/commit/285b752))
- Remove pnpm-lock from playground and simplify package.json ([53019d4](https://github.com/kikiutils/nuxt/commit/53019d4))
- Tidy up dependencies ([4536cf7](https://github.com/kikiutils/nuxt/commit/4536cf7))
- Update playground nuxt config ([75e3cfe](https://github.com/kikiutils/nuxt/commit/75e3cfe))
- Upgrade dependencies ([e47a7d7](https://github.com/kikiutils/nuxt/commit/e47a7d7))

### ❤️ Contributors

- kiki-kanri

## v8.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.6...v8.0.0)

### 💅 Refactors

- ⚠️ Split `unpluginFonts.google.disableDeferAndAutoAddPreloadLink` into `addPreloadLink` and `noDefer` options ([d26626a](https://github.com/kikiutils/nuxt/commit/d26626a))

### 📖 Documentation

- Update README ([edd9d36](https://github.com/kikiutils/nuxt/commit/edd9d36))

### 🏡 Chore

- ⚠️ Drop support for Node.js 18.12.1, set minimum supported version to 20 ([32c6ad3](https://github.com/kikiutils/nuxt/commit/32c6ad3))
- Upgrade dependencies ([a95f9a6](https://github.com/kikiutils/nuxt/commit/a95f9a6))
- Update typecheck script ([594d86c](https://github.com/kikiutils/nuxt/commit/594d86c))
- Remove files that are no longer needed ([89fdc37](https://github.com/kikiutils/nuxt/commit/89fdc37))
- Set default nuxt options `typescript.nodeTsConfig` ([6de2209](https://github.com/kikiutils/nuxt/commit/6de2209))

#### ⚠️ Breaking Changes

- ⚠️ Split `unpluginFonts.google.disableDeferAndAutoAddPreloadLink` into `addPreloadLink` and `noDefer` options ([d26626a](https://github.com/kikiutils/nuxt/commit/d26626a))
- ⚠️ Drop support for Node.js 18.12.1, set minimum supported version to 20 ([32c6ad3](https://github.com/kikiutils/nuxt/commit/32c6ad3))

### ❤️ Contributors

- kiki-kanri

## v7.1.6

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.5...v7.1.6)

### 🏡 Chore

- Update dependencies and modify scripts ([374cc56](https://github.com/kikiutils/nuxt/commit/374cc56))
- Upgrade dependencies and migrate nuxt to v4 ([8311ac9](https://github.com/kikiutils/nuxt/commit/8311ac9))
- Tidy up devDependencies ([e1c52b9](https://github.com/kikiutils/nuxt/commit/e1c52b9))

### ❤️ Contributors

- kiki-kanri

## v7.1.5

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.4...v7.1.5)

### 🏡 Chore

- Upgrade dependencies ([2a20964](https://github.com/kikiutils/nuxt/commit/2a20964))
- Add blank lines in `src/types/options.ts` for readability ([aceefcc](https://github.com/kikiutils/nuxt/commit/aceefcc))

### ✅ Tests

- Change vitest config file to mjs ([5c3bc1f](https://github.com/kikiutils/nuxt/commit/5c3bc1f))

### ❤️ Contributors

- kiki-kanri

## v7.1.4

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.3...v7.1.4)

### 💅 Refactors

- Change Nuxt base directory from `rootDir` to `srcDir` in `setupDeepScanAutoImports` ([fae7cd0](https://github.com/kikiutils/nuxt/commit/fae7cd0))

### 🏡 Chore

- Upgrade dependencies and remove `@types/node` ([32aaf31](https://github.com/kikiutils/nuxt/commit/32aaf31))
- Wrap all variable expansions in scripts with `${}` ([82c47c9](https://github.com/kikiutils/nuxt/commit/82c47c9))

### 🤖 CI

- Set `--prod=false` when install dependencies ([93d7945](https://github.com/kikiutils/nuxt/commit/93d7945))
- Remove `--prod=false` flag when install dependencies ([249def0](https://github.com/kikiutils/nuxt/commit/249def0))

### ❤️ Contributors

- kiki-kanri

## v7.1.3

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.2...v7.1.3)

### 📖 Documentation

- Update README ([0c19ed4](https://github.com/kikiutils/nuxt/commit/0c19ed4))

### 🏡 Chore

- Set eslint config to enable `lib` mode ([59e03e4](https://github.com/kikiutils/nuxt/commit/59e03e4))
- Disable `ts/explicit-function-return-type` eslint rule ([5190f6b](https://github.com/kikiutils/nuxt/commit/5190f6b))
- Lint code ([f8f0974](https://github.com/kikiutils/nuxt/commit/f8f0974))
- **test:** Migrate from `jest` to `vitest` ([9a9d869](https://github.com/kikiutils/nuxt/commit/9a9d869))
- Split `tsconfig` and create build-specific config for production builds ([564b6d2](https://github.com/kikiutils/nuxt/commit/564b6d2))
- **vitest:** Configure coverage to collect files only under `src/` ([e2c7f65](https://github.com/kikiutils/nuxt/commit/e2c7f65))
- Lint code ([2cd6a35](https://github.com/kikiutils/nuxt/commit/2cd6a35))

### 🤖 CI

- Add workflow yaml ([546c02d](https://github.com/kikiutils/nuxt/commit/546c02d))

### ❤️ Contributors

- kiki-kanri

## v7.1.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.1...v7.1.2)

### 🏡 Chore

- **scripts:** Ensure all scripts `cd` to their current directory correctly ([5362c3b](https://github.com/kikiutils/nuxt/commit/5362c3b))
- Set `--max-warnings=0` for `lint` and `lint:fix` ([bffe476](https://github.com/kikiutils/nuxt/commit/bffe476))
- Upgrade dependencies ([d6be7e6](https://github.com/kikiutils/nuxt/commit/d6be7e6))
- Set default `colorMode` storage to `cookie` ([529d6ab](https://github.com/kikiutils/nuxt/commit/529d6ab))

### 🤖 CI

- Update test workflow ([1519e46](https://github.com/kikiutils/nuxt/commit/1519e46))
- Update condition for uploading to Codecov in workflow job ([39851ac](https://github.com/kikiutils/nuxt/commit/39851ac))

### ❤️ Contributors

- kiki-kanri

## v7.1.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.1.0...v7.1.1)

### 🏡 Chore

- Add `sass-embedded` dependencies ([5967aec](https://github.com/kikiutils/nuxt/commit/5967aec))

### ❤️ Contributors

- kiki-kanri

## v7.1.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v7.0.0...v7.1.0)

### 🚀 Enhancements

- Add `elementPlus` option to `autoImportUtils['@kikiutils/shared']` and implement related functionality ([bc87d90](https://github.com/kikiutils/nuxt/commit/bc87d90))

### 🏡 Chore

- Upgrade dependencies ([f89d5c0](https://github.com/kikiutils/nuxt/commit/f89d5c0))

### ❤️ Contributors

- kiki-kanri

## v7.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v6.0.4...v7.0.0)

### 🚀 Enhancements

- Initialize module `setup` ([f31be89](https://github.com/kikiutils/nuxt/commit/f31be89))
- Add feature to configure and install `@nuxtjs/color-mode` module ([c24f6dd](https://github.com/kikiutils/nuxt/commit/c24f6dd))
- Add feature to configure and install `@element-plus/nuxt` module ([ec71a3d](https://github.com/kikiutils/nuxt/commit/ec71a3d))
- Add feature to configure and install `@nuxtjs/robots` module ([ae3d756](https://github.com/kikiutils/nuxt/commit/ae3d756))
- Add feature to configure and install `nuxt-security` module ([d1a56c5](https://github.com/kikiutils/nuxt/commit/d1a56c5))
- Add feature to configure and install `@vueuse/nuxt` module ([427c3e4](https://github.com/kikiutils/nuxt/commit/427c3e4))
- Add feature to configure and install `@unocss/nuxt` module ([52f428f](https://github.com/kikiutils/nuxt/commit/52f428f))
- Add feature to configure and install `unplugin-fonts` module ([782eb75](https://github.com/kikiutils/nuxt/commit/782eb75))
- Add `setupStyles` and reboot css ([cc6f660](https://github.com/kikiutils/nuxt/commit/cc6f660))
- Add `setupPlugins` and reboot css ([f7614ce](https://github.com/kikiutils/nuxt/commit/f7614ce))
- Add `autoImportUtils` option to control global utility imports ([f16c52f](https://github.com/kikiutils/nuxt/commit/f16c52f))
- Add `nuxtConfigOverrides` to customize internal Nuxt config defaults ([209f705](https://github.com/kikiutils/nuxt/commit/209f705))
- Add `deepScanAutoImportDirs` option and related functionally ([ba8fa80](https://github.com/kikiutils/nuxt/commit/ba8fa80))
- Add `globalTypeImports` option to enable global type injection ([eaf7bcb](https://github.com/kikiutils/nuxt/commit/eaf7bcb))

### 🔥 Performance

- Optimize default Vite build `manualChunks` behavior ([3e5e942](https://github.com/kikiutils/nuxt/commit/3e5e942))
- Run `setupAutoImportUtils` and `setupModules` in parallel with Promise.all ([0c2e2bd](https://github.com/kikiutils/nuxt/commit/0c2e2bd))

### 🩹 Fixes

- Resolve type error ([63d6e34](https://github.com/kikiutils/nuxt/commit/63d6e34))
- Correct invalid ESLint configuration ([0d64316](https://github.com/kikiutils/nuxt/commit/0d64316))

### 💅 Refactors

- Restructure project based on Nuxt module template ([449cd43](https://github.com/kikiutils/nuxt/commit/449cd43))
- Change first param of `setupNuxtConfigOverrides` to `resolvedModuleOptions` ([0645b49](https://github.com/kikiutils/nuxt/commit/0645b49))
- Extract deep scan auto-import logic into a separate function ([fdcbc6f](https://github.com/kikiutils/nuxt/commit/fdcbc6f))
- Adjust `setup` execution order ([058d5dc](https://github.com/kikiutils/nuxt/commit/058d5dc))

### 📖 Documentation

- Update README badges urls ([499bc71](https://github.com/kikiutils/nuxt/commit/499bc71))
- Replace `%2F` with `/` in badge URLs in README ([4aaf916](https://github.com/kikiutils/nuxt/commit/4aaf916))
- Update README ([f8e5067](https://github.com/kikiutils/nuxt/commit/f8e5067))

### 📦 Build

- Add build config ([2078d79](https://github.com/kikiutils/nuxt/commit/2078d79))

### 🏡 Chore

- Format script ([16ca049](https://github.com/kikiutils/nuxt/commit/16ca049))
- Update file permissions after installing or updating dependencies ([d141f76](https://github.com/kikiutils/nuxt/commit/d141f76))
- Add `--hideAuthorEmail` flag to bumplog command ([382091b](https://github.com/kikiutils/nuxt/commit/382091b))
- Add typecheck command to package.json scripts ([2a1f7e0](https://github.com/kikiutils/nuxt/commit/2a1f7e0))
- Rename `jest.config.js` to `jest.config.mjs` ([76371a1](https://github.com/kikiutils/nuxt/commit/76371a1))
- Reorder lint, test, and build steps in release command ([b63dcb4](https://github.com/kikiutils/nuxt/commit/b63dcb4))
- Disable `isolatedDeclarations` in tsconfig ([ed1636f](https://github.com/kikiutils/nuxt/commit/ed1636f))
- Update `modify-files-permissions.sh` ([89f72e3](https://github.com/kikiutils/nuxt/commit/89f72e3))
- Add option to `upgrade-dependencies.sh` to clean `node_modules` and `pnpm-lock.yaml` before upgrading ([e542b14](https://github.com/kikiutils/nuxt/commit/e542b14))
- Upgrade dependencies ([d3ee5a7](https://github.com/kikiutils/nuxt/commit/d3ee5a7))
- Ensure all scripts change to their own directory before execution ([9be5fbf](https://github.com/kikiutils/nuxt/commit/9be5fbf))
- Update ignore files ([c81c294](https://github.com/kikiutils/nuxt/commit/c81c294))
- Upgrade dependencies ([32e724d](https://github.com/kikiutils/nuxt/commit/32e724d))
- Add Stylelint and update related configurations ([5d7cb27](https://github.com/kikiutils/nuxt/commit/5d7cb27))
- Lint code ([fb80eb7](https://github.com/kikiutils/nuxt/commit/fb80eb7))
- ⚠️ Remove all source files ([8cb9043](https://github.com/kikiutils/nuxt/commit/8cb9043))
- Tidy up dependencies ([fc0fe25](https://github.com/kikiutils/nuxt/commit/fc0fe25))
- Tidy up dependencies ([ab519c4](https://github.com/kikiutils/nuxt/commit/ab519c4))
- Remove some empty lines ([0669d9c](https://github.com/kikiutils/nuxt/commit/0669d9c))
- Modify comments ([138244c](https://github.com/kikiutils/nuxt/commit/138244c))
- Update playground `nuxt.config` to use full module options ([5d35d30](https://github.com/kikiutils/nuxt/commit/5d35d30))
- Tidy up dependencies ([c6d3927](https://github.com/kikiutils/nuxt/commit/c6d3927))
- Move `type-fest` to devDependencies ([7fb0181](https://github.com/kikiutils/nuxt/commit/7fb0181))
- Add duration to module loaded log message ([67d27d7](https://github.com/kikiutils/nuxt/commit/67d27d7))
- Playground add `@kikiutils/types` devDependencies ([dc31898](https://github.com/kikiutils/nuxt/commit/dc31898))

### ✅ Tests

- Add pass test unit ([d7b98bd](https://github.com/kikiutils/nuxt/commit/d7b98bd))

### 🤖 CI

- Add test github workflow config file ([dd421d1](https://github.com/kikiutils/nuxt/commit/dd421d1))

#### ⚠️ Breaking Changes

- ⚠️ Remove all source files ([8cb9043](https://github.com/kikiutils/nuxt/commit/8cb9043))

### ❤️ Contributors

- kiki-kanri

## v6.0.4

[compare changes](https://github.com/kikiutils/nuxt/compare/v6.0.3...v6.0.4)

### 🏡 Chore

- Upgrade dependencies ([90cdc5e](https://github.com/kikiutils/nuxt/commit/90cdc5e))

### ❤️ Contributors

- kiki-kanri

## v6.0.3

[compare changes](https://github.com/kikiutils/nuxt/compare/v6.0.2...v6.0.3)

### 🩹 Fixes

- Make fields in `nuxtOptions` type optional ([d78bece](https://github.com/kikiutils/nuxt/commit/d78bece))

### 🏡 Chore

- Set `compilerOptions.allowSyntheticDefaultImports` to false in default typescript config ([049c7d1](https://github.com/kikiutils/nuxt/commit/049c7d1))
- Upgrade dependencies ([428be7f](https://github.com/kikiutils/nuxt/commit/428be7f))

### ❤️ Contributors

- kiki-kanri

## v6.0.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v6.0.1...v6.0.2)

### 🏡 Chore

- Set `sideEffects` to false in package.json ([f0faa23](https://github.com/kikiutils/nuxt/commit/f0faa23))
- Remove `prettier` field from package.json ([d3d5d04](https://github.com/kikiutils/nuxt/commit/d3d5d04))

### ❤️ Contributors

- kiki-kanri

## v6.0.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v6.0.0...v6.0.1)

### 🏡 Chore

- Upgrade dependencies ([de684dd](https://github.com/kikiutils/nuxt/commit/de684dd))
- Remove `@kikiutils/prettierrc` devDependencies ([1721957](https://github.com/kikiutils/nuxt/commit/1721957))

### ❤️ Contributors

- kiki-kanri

## v6.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v5.0.0...v6.0.0)

### 🚀 Enhancements

- Add `useScrollMemory` composable and related options ([10ebd72](https://github.com/kikiutils/nuxt/commit/10ebd72))

### 📦 Build

- ⚠️ Drop CJS output and configure package as ESM in response to @nuxt/module-builder update ([7910ae9](https://github.com/kikiutils/nuxt/commit/7910ae9))

### 🏡 Chore

- Upgrade dependencies ([27d5a3c](https://github.com/kikiutils/nuxt/commit/27d5a3c))

#### ⚠️ Breaking Changes

- ⚠️ Drop CJS output and configure package as ESM in response to @nuxt/module-builder update ([7910ae9](https://github.com/kikiutils/nuxt/commit/7910ae9))

### ❤️ Contributors

- kiki-kanri

## v5.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v4.0.0...v5.0.0)

### 🚀 Enhancements

- Add `importAllUtilsDirTsFiles` option and functionality ([c484119](https://github.com/kikiutils/nuxt/commit/c484119))
- Add more reboot styles ([454b864](https://github.com/kikiutils/nuxt/commit/454b864))

### 💅 Refactors

- ⚠️ Move all `composables` to `utils` ([543c8f1](https://github.com/kikiutils/nuxt/commit/543c8f1))
- ⚠️ Update `createElFormItemRule` to remove default message and only handle defaults for `required`, `trigger`, and `type` ([90706c9](https://github.com/kikiutils/nuxt/commit/90706c9))
- ⚠️ Change all utils exports to use export * ([e7c3de9](https://github.com/kikiutils/nuxt/commit/e7c3de9))
- ⚠️ Change `removeConsole` default include option to `['log']` ([8cf6535](https://github.com/kikiutils/nuxt/commit/8cf6535))
- ⚠️ Rename `unocss` to `unoCss` and `vueuse` to `vueUse` ([ad9e2cd](https://github.com/kikiutils/nuxt/commit/ad9e2cd))
- ⚠️ Rename `unoCss.enabledReset` option to `unoCss.enabledResets` ([17e7e03](https://github.com/kikiutils/nuxt/commit/17e7e03))

### 📖 Documentation

- Update README ([0a63e71](https://github.com/kikiutils/nuxt/commit/0a63e71))

### 🏡 Chore

- Update CHANGELOG ([a1b2064](https://github.com/kikiutils/nuxt/commit/a1b2064))
- Set `hideAuthorEmail` arg in changelog command ([da5f46e](https://github.com/kikiutils/nuxt/commit/da5f46e))
- Upgrade dependencies ([6f3c483](https://github.com/kikiutils/nuxt/commit/6f3c483))
- ⚠️ Upgrade dependencies ([e18122c](https://github.com/kikiutils/nuxt/commit/e18122c))
- Format and lint code ([a15aa52](https://github.com/kikiutils/nuxt/commit/a15aa52))
- ⚠️ Remove `axios` composables ([02e1b0b](https://github.com/kikiutils/nuxt/commit/02e1b0b))
- ⚠️ Remove default Google Font families setting ([fc89db0](https://github.com/kikiutils/nuxt/commit/fc89db0))
- Clean up and organize code ([e10a261](https://github.com/kikiutils/nuxt/commit/e10a261))
- Set module nuxt compatibility meta ([e962992](https://github.com/kikiutils/nuxt/commit/e962992))
- Update eslint config ([4fa6f29](https://github.com/kikiutils/nuxt/commit/4fa6f29))

### 🎨 Styles

- ⚠️ Remove font, scrollbar, element-plus/reboot CSS, and line-height in reboot ([4bfc13f](https://github.com/kikiutils/nuxt/commit/4bfc13f))

#### ⚠️ Breaking Changes

- ⚠️ Move all `composables` to `utils` ([543c8f1](https://github.com/kikiutils/nuxt/commit/543c8f1))
- ⚠️ Update `createElFormItemRule` to remove default message and only handle defaults for `required`, `trigger`, and `type` ([90706c9](https://github.com/kikiutils/nuxt/commit/90706c9))
- ⚠️ Change all utils exports to use export * ([e7c3de9](https://github.com/kikiutils/nuxt/commit/e7c3de9))
- ⚠️ Change `removeConsole` default include option to `['log']` ([8cf6535](https://github.com/kikiutils/nuxt/commit/8cf6535))
- ⚠️ Rename `unocss` to `unoCss` and `vueuse` to `vueUse` ([ad9e2cd](https://github.com/kikiutils/nuxt/commit/ad9e2cd))
- ⚠️ Rename `unoCss.enabledReset` option to `unoCss.enabledResets` ([17e7e03](https://github.com/kikiutils/nuxt/commit/17e7e03))
- ⚠️ Upgrade dependencies ([e18122c](https://github.com/kikiutils/nuxt/commit/e18122c))
- ⚠️ Remove `axios` composables ([02e1b0b](https://github.com/kikiutils/nuxt/commit/02e1b0b))
- ⚠️ Remove default Google Font families setting ([fc89db0](https://github.com/kikiutils/nuxt/commit/fc89db0))
- ⚠️ Remove font, scrollbar, element-plus/reboot CSS, and line-height in reboot ([4bfc13f](https://github.com/kikiutils/nuxt/commit/4bfc13f))

### ❤️ Contributors

- kiki-kanri

## v4.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v3.0.0...v4.0.0)

### 💅 Refactors

- ⚠️ Change some nuxt options to use `module options` instead ([88c3689](https://github.com/kikiutils/nuxt/commit/88c3689))

### 🏡 Chore

- Upgrade dependencies ([33587c0](https://github.com/kikiutils/nuxt/commit/33587c0))
- Update repository URL ([4a5b959](https://github.com/kikiutils/nuxt/commit/4a5b959))
- Update pnpm lock file ([8845684](https://github.com/kikiutils/nuxt/commit/8845684))

#### ⚠️ Breaking Changes

- ⚠️ Change some nuxt options to use `module options` instead ([88c3689](https://github.com/kikiutils/nuxt/commit/88c3689))

### ❤️ Contributors

- kiki-kanri

## v3.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.2...v3.0.0)

### 💅 Refactors

- ⚠️ Enforce camelCase naming for all variables, classes, methods, types, etc., ignoring abbreviations ([aa271f5](https://github.com/kikiutils/nuxt/commit/aa271f5))
- Specify interface type for settings when using defu to modify or merge module configurations ([6e9f71b](https://github.com/kikiutils/nuxt/commit/6e9f71b))

### 🏡 Chore

- Upgrade dependencies ([ddf877d](https://github.com/kikiutils/nuxt/commit/ddf877d))

#### ⚠️ Breaking Changes

- ⚠️ Enforce camelCase naming for all variables, classes, methods, types, etc., ignoring abbreviations ([aa271f5](https://github.com/kikiutils/nuxt/commit/aa271f5))

### ❤️ Contributors

- kiki-kanri

## v2.0.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.1...v2.0.2)

### 🩹 Fixes

- Automatically add `copy-to-clipboard` dependency to `vite.optimizeDeps` ([bb3def3](https://github.com/kikiutils/nuxt/commit/bb3def3))

### 🏡 Chore

- Upgrade dependencies ([8266557](https://github.com/kikiutils/nuxt/commit/8266557))

### ❤️ Contributors

- kiki-kanri

## v2.0.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0...v2.0.1)

### 🏡 Chore

- Remove default options from security module ([39676be](https://github.com/kikiutils/nuxt/commit/39676be))
- Remove automatic configuration of `optimizeDeps` ([b574958](https://github.com/kikiutils/nuxt/commit/b574958))
- Upgrade dependencies ([3745817](https://github.com/kikiutils/nuxt/commit/3745817))

### 🎨 Styles

- Format codes ([02d3303](https://github.com/kikiutils/nuxt/commit/02d3303))

### ❤️ Contributors

- kiki-kanri

## v2.0.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.24...v2.0.0)

### 💅 Refactors

- ⚠️ Update package structure and simplify settings ([fa0995e](https://github.com/kikiutils/nuxt/commit/fa0995e))

### 📖 Documentation

- Update README ([26e6343](https://github.com/kikiutils/nuxt/commit/26e6343))

### 🏡 Chore

- Upgrade dependencies ([f083552](https://github.com/kikiutils/nuxt/commit/f083552))

#### ⚠️ Breaking Changes

- ⚠️ Update package structure and simplify settings ([fa0995e](https://github.com/kikiutils/nuxt/commit/fa0995e))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.24

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.23...v2.0.0-rc.24)

### 💅 Refactors

- ⚠️ Update package options and dependencies ([1e81428](https://github.com/kikiutils/nuxt/commit/1e81428))

### 🏡 Chore

- Upgrade dependencies and set `pnpm.onlyBuiltDependencies` in `package.json` ([68993dc](https://github.com/kikiutils/nuxt/commit/68993dc))
- Replace Prettier with ESLint, add related files, and update VSCode settings ([da1e13b](https://github.com/kikiutils/nuxt/commit/da1e13b))
- Modify scripts in `package.json` ([1bbce66](https://github.com/kikiutils/nuxt/commit/1bbce66))
- Modify `playground/nuxt.config.ts` ([9397a32](https://github.com/kikiutils/nuxt/commit/9397a32))
- Organize dependencies list ([2a040e2](https://github.com/kikiutils/nuxt/commit/2a040e2))
- Modify purgecss configuration with unocss ([a96123e](https://github.com/kikiutils/nuxt/commit/a96123e))

### 🎨 Styles

- Lint `package.json` ([cf4cfbf](https://github.com/kikiutils/nuxt/commit/cf4cfbf))
- Format and lint add codes ([73a1dec](https://github.com/kikiutils/nuxt/commit/73a1dec))

#### ⚠️ Breaking Changes

- ⚠️ Update package options and dependencies ([1e81428](https://github.com/kikiutils/nuxt/commit/1e81428))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.23

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.22...v2.0.0-rc.23)

### 🏡 Chore

- Upgrade dependencies ([6ce971c](https://github.com/kikiutils/nuxt/commit/6ce971c))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.22

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.21...v2.0.0-rc.22)

### 🏡 Chore

- Modify files permissions ([1968d1a](https://github.com/kikiutils/nuxt/commit/1968d1a))
- Upgrade dependencies ([4cbd0e2](https://github.com/kikiutils/nuxt/commit/4cbd0e2))
- Update package.json ([acb1871](https://github.com/kikiutils/nuxt/commit/acb1871))
- Switch changelog generation package ([946f078](https://github.com/kikiutils/nuxt/commit/946f078))
- Add release script to package.json ([c3999f6](https://github.com/kikiutils/nuxt/commit/c3999f6))
- Upgrade dependencies ([2a8c439](https://github.com/kikiutils/nuxt/commit/2a8c439))
- Set TypeScript version to 5.6.2 ([2ce2fd2](https://github.com/kikiutils/nuxt/commit/2ce2fd2))

### 🎨 Styles

- Reorder badge URLs in README ([be1ae8d](https://github.com/kikiutils/nuxt/commit/be1ae8d))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.21

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.20...v2.0.0-rc.21)

### 🚀 Enhancements

- Export `getDateRangeFromDate` in datetime utils ([dbb6812](https://github.com/kikiutils/nuxt/commit/dbb6812))

### 🏡 Chore

- Modify file permissions ([ac5002b](https://github.com/kikiutils/nuxt/commit/ac5002b))
- Upgrade dependencies ([795bfdd](https://github.com/kikiutils/nuxt/commit/795bfdd))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.20

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.19...v2.0.0-rc.20)

### 🏡 Chore

- Update dependency versions to use caret (^) prefix ([a42902d](https://github.com/kikiutils/nuxt/commit/a42902d))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.19

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.18...v2.0.0-rc.19)

### 🏡 Chore

- Update .gitignore ([936fa46](https://github.com/kikiutils/nuxt/commit/936fa46))
- Upgrade dependencies ([2a111e7](https://github.com/kikiutils/nuxt/commit/2a111e7))
- Update axios export method ([be12a29](https://github.com/kikiutils/nuxt/commit/be12a29))
- Update export paths in utils types ([6f419f6](https://github.com/kikiutils/nuxt/commit/6f419f6))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.18

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.17...v2.0.0-rc.18)

### 🩹 Fixes

- Install missing vue-tsc dependency ([dfe63b9](https://github.com/kikiutils/nuxt/commit/dfe63b9))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.17

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.16...v2.0.0-rc.17)

### 💅 Refactors

- Update dependencies and remove some dependencies ([18cc46e](https://github.com/kikiutils/nuxt/commit/18cc46e))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.16

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.15...v2.0.0-rc.16)

### 🩹 Fixes

- Add `copy-to-clipboard` to vite optimizeDeps array ([595c532](https://github.com/kikiutils/nuxt/commit/595c532))

### 🏡 Chore

- Upgrade dependencies ([7df6d77](https://github.com/kikiutils/nuxt/commit/7df6d77))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.15

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.14...v2.0.0-rc.15)

### 🚀 Enhancements

- Add `addVueRouterToBuildTranspile` setting and related functionality ([75db351](https://github.com/kikiutils/nuxt/commit/75db351))

### 💅 Refactors

- Modify parameters passed to `createError` ([190b14b](https://github.com/kikiutils/nuxt/commit/190b14b))

### 🏡 Chore

- Upgrade dependencies ([8742dcc](https://github.com/kikiutils/nuxt/commit/8742dcc))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.14

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.13...v2.0.0-rc.14)

### 💅 Refactors

- Modify export method for types ([cf29eba](https://github.com/kikiutils/nuxt/commit/cf29eba))

### 🏡 Chore

- Update and tidy up dependencies ([cade3c0](https://github.com/kikiutils/nuxt/commit/cade3c0))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.13

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.12...v2.0.0-rc.13)

### 🏡 Chore

- Upgrade dependencies ([6264438](https://github.com/kikiutils/nuxt/commit/6264438))
- Modify export types statements ([be05495](https://github.com/kikiutils/nuxt/commit/be05495))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.12

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.11...v2.0.0-rc.12)

### 🩹 Fixes

- Correct invalid settings in reboot.css ([c81e1b3](https://github.com/kikiutils/nuxt/commit/c81e1b3))

### 🏡 Chore

- Upgrade dependencies ([b47ef25](https://github.com/kikiutils/nuxt/commit/b47ef25))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.11

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.10...v2.0.0-rc.11)

### 🩹 Fixes

- Make `nuxtOptions.nitro.minify` option optional ([9611aeb](https://github.com/kikiutils/nuxt/commit/9611aeb))

### 🏡 Chore

- Upgrade dependencies ([c5320ed](https://github.com/kikiutils/nuxt/commit/c5320ed))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.10

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.9...v2.0.0-rc.10)

### 🚀 Enhancements

- Add more server error utils ([eb82360](https://github.com/kikiutils/nuxt/commit/eb82360))

### 🏡 Chore

- Upgrade dependencies ([8847b1a](https://github.com/kikiutils/nuxt/commit/8847b1a))

### 🎨 Styles

- Update Element Plus related fixes in styles ([a94675a](https://github.com/kikiutils/nuxt/commit/a94675a))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.9

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.8...v2.0.0-rc.9)

### 🚀 Enhancements

- Add Element Plus reboot CSS and related settings ([9c40b1e](https://github.com/kikiutils/nuxt/commit/9c40b1e))

### 🩹 Fixes

- Prevent dragover and drop event listeners from blocking non-file related events ([0935d2f](https://github.com/kikiutils/nuxt/commit/0935d2f))
- Correct erroneous variable and parameter names ([83ceb61](https://github.com/kikiutils/nuxt/commit/83ceb61))

### 🏡 Chore

- Upgrade dependencies ([2fad1d5](https://github.com/kikiutils/nuxt/commit/2fad1d5))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.8

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.7-deprecated...v2.0.0-rc.8)

### 🩹 Fixes

- Correct the method of registering plugins ([6da3f50](https://github.com/kikiutils/nuxt/commit/6da3f50))
- Downgrade vue-tsc to v1 to resolve compatibility issues ([5cf3966](https://github.com/kikiutils/nuxt/commit/5cf3966))

### 📖 Documentation

- Mark v2.0.0-rc.7 as deprecated in CHANGELOG ([0606603](https://github.com/kikiutils/nuxt/commit/0606603))

### 🏡 Chore

- Remove release command from package.json scripts ([fddebe1](https://github.com/kikiutils/nuxt/commit/fddebe1))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.7-deprecated

**Important: Deprecated Version**

This version cannot operate correctly. Please use a newer version or revert to 2.0.0-rc.6.

Thank you for your continued support.

***

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.6...v2.0.0-rc.7-deprecated)

### 🚀 Enhancements

- Add plugin and related options for registering dragover and drop event listeners ([569bf70](https://github.com/kikiutils/nuxt/commit/569bf70))

### 🏡 Chore

- Upgrade dependencies ([40e01d7](https://github.com/kikiutils/nuxt/commit/40e01d7))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.6

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.5...v2.0.0-rc.6)

### 🚀 Enhancements

- Add axios composables ([c77e184](https://github.com/kikiutils/nuxt/commit/c77e184))

### 💅 Refactors

- ⚠️ Rename `enabledServerUtils` options time property to datetime ([4c5a3b7](https://github.com/kikiutils/nuxt/commit/4c5a3b7))

#### ⚠️ Breaking Changes

- ⚠️ Rename `enabledServerUtils` options time property to datetime ([4c5a3b7](https://github.com/kikiutils/nuxt/commit/4c5a3b7))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.5

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.4...v2.0.0-rc.5)

### 💅 Refactors

- Source some composables from package exports ([e8d5108](https://github.com/kikiutils/nuxt/commit/e8d5108))

### 🏡 Chore

- Upgrade dependencies ([421fc9c](https://github.com/kikiutils/nuxt/commit/421fc9c))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.4

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.3...v2.0.0-rc.4)

### 🩹 Fixes

- Make `removeConsoleOptions` module options optional ([aadf202](https://github.com/kikiutils/nuxt/commit/aadf202))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.3

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.2...v2.0.0-rc.3)

### 🚀 Enhancements

- Add `removeConsoleOptions` module options ([8667ef7](https://github.com/kikiutils/nuxt/commit/8667ef7))

### 🏡 Chore

- Upgrade dependencies ([07b1f99](https://github.com/kikiutils/nuxt/commit/07b1f99))

### 🎨 Styles

- Format code ([47764d3](https://github.com/kikiutils/nuxt/commit/47764d3))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.1...v2.0.0-rc.2)

### 🏡 Chore

- Upgrade dependencies ([dbdf0f1](https://github.com/kikiutils/nuxt/commit/dbdf0f1))
- Update scripts in package.json ([d6313d3](https://github.com/kikiutils/nuxt/commit/d6313d3))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-rc.0...v2.0.0-rc.1)

### 🚀 Enhancements

- Add functionality to disable entire options group ([37a633f](https://github.com/kikiutils/nuxt/commit/37a633f))

### 🩹 Fixes

- Correct purgecss configuration handling ([de22983](https://github.com/kikiutils/nuxt/commit/de22983))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-rc.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.6...v2.0.0-rc.0)

### 🚀 Enhancements

- Add nitro minify option to nuxtOptions ([1c1467f](https://github.com/kikiutils/nuxt/commit/1c1467f))

### 📖 Documentation

- Update README ([1e8e275](https://github.com/kikiutils/nuxt/commit/1e8e275))

### 🏡 Chore

- Upgrade dependencies ([0ba2b07](https://github.com/kikiutils/nuxt/commit/0ba2b07))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.6

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.5...v2.0.0-alpha.6)

### 💅 Refactors

- Change method of adding server utils ([dbd3ae4](https://github.com/kikiutils/nuxt/commit/dbd3ae4))

### 📖 Documentation

- Add default values for options in TSDoc ([94578af](https://github.com/kikiutils/nuxt/commit/94578af))

### 🏡 Chore

- Upgrade dependencies ([bd18b36](https://github.com/kikiutils/nuxt/commit/bd18b36))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.5

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.4...v2.0.0-alpha.5)

### 🩹 Fixes

- Remove composables conflicting with element-plus ([3ee1315](https://github.com/kikiutils/nuxt/commit/3ee1315))
- Resolve element-plus form composables missing type ([117c849](https://github.com/kikiutils/nuxt/commit/117c849))
- Add missing import for createError ([5677b59](https://github.com/kikiutils/nuxt/commit/5677b59))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.4

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.3...v2.0.0-alpha.4)

### 🚀 Enhancements

- Add element-plus module with related options and setup function ([bb4d997](https://github.com/kikiutils/nuxt/commit/bb4d997))
- Add element-plus composables with related options and functionality ([d6de918](https://github.com/kikiutils/nuxt/commit/d6de918))

### 🎨 Styles

- Format code ([3266b41](https://github.com/kikiutils/nuxt/commit/3266b41))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.3

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.2...v2.0.0-alpha.3)

### 🚀 Enhancements

- Add time composables with related options and functionality ([68c0818](https://github.com/kikiutils/nuxt/commit/68c0818))
- Add server error utils with related options and functionality ([835bfff](https://github.com/kikiutils/nuxt/commit/835bfff))
- Add utils types with related options and functionality ([bac638d](https://github.com/kikiutils/nuxt/commit/bac638d))
- Add text composables with related options and functionality ([dd58c11](https://github.com/kikiutils/nuxt/commit/dd58c11))

### 🏡 Chore

- Upgrade dependencies ([03ad9cb](https://github.com/kikiutils/nuxt/commit/03ad9cb))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.2

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.1...v2.0.0-alpha.2)

### 🚀 Enhancements

- Add tailwind reset settings and functionality in UnoCSS ([e922f50](https://github.com/kikiutils/nuxt/commit/e922f50))
- Add nuxt devtools options ([b3b3896](https://github.com/kikiutils/nuxt/commit/b3b3896))
- Add hash composables with related options and functionality ([fda8208](https://github.com/kikiutils/nuxt/commit/fda8208))
- Add string composables with related options and functionality ([3d90dc6](https://github.com/kikiutils/nuxt/commit/3d90dc6))

### 💅 Refactors

- Remove unnecessary exports ([06336ad](https://github.com/kikiutils/nuxt/commit/06336ad))
- Modify the method of setting options ([15f9643](https://github.com/kikiutils/nuxt/commit/15f9643))

### 🏡 Chore

- Upgrade dependencies ([e51d276](https://github.com/kikiutils/nuxt/commit/e51d276))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.1

[compare changes](https://github.com/kikiutils/nuxt/compare/v2.0.0-alpha.0...v2.0.0-alpha.1)

### 🚀 Enhancements

- Add styles options and corresponding files ([ed65299](https://github.com/kikiutils/nuxt/commit/ed65299))

### 🩹 Fixes

- Correct erroneous declare module names and remove export from schema ([d11933f](https://github.com/kikiutils/nuxt/commit/d11933f))
- Correctly add composables directory ([bb27804](https://github.com/kikiutils/nuxt/commit/bb27804))

### 💅 Refactors

- Reorder ModuleOptions properties ([e8145d3](https://github.com/kikiutils/nuxt/commit/e8145d3))
- Change order of arguments in functions ([680acee](https://github.com/kikiutils/nuxt/commit/680acee))

### 🏡 Chore

- Upgrade dependencies ([3336e1a](https://github.com/kikiutils/nuxt/commit/3336e1a))

### 🎨 Styles

- Format modules.ts code ([6a4fa71](https://github.com/kikiutils/nuxt/commit/6a4fa71))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.0

[compare changes](https://github.com/kikiutils/nuxt/compare/v1.0.4...v2.0.0-alpha.0)

### BREAKING CHANGES

This module is being rewritten in the same way as the official examples, and all features are still to be determined.

Old features will be changed or removed.

### 🚀 Enhancements

- Add basic module files ([0a5dfcc](https://github.com/kikiutils/nuxt/commit/0a5dfcc))
- Add dependencies required for module ([0a862f6](https://github.com/kikiutils/nuxt/commit/0a862f6))
- Add ModuleOptions interface ([659420f](https://github.com/kikiutils/nuxt/commit/659420f))
- Add schema types file ([fae882f](https://github.com/kikiutils/nuxt/commit/fae882f))
- Implement functionality to configure modules and options ([6d91e2c](https://github.com/kikiutils/nuxt/commit/6d91e2c))

### 🏡 Chore

- Remove all files for a clean slate ([1aa8b1f](https://github.com/kikiutils/nuxt/commit/1aa8b1f))

### ❤️ Contributors

- kiki-kanri
