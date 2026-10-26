# v13 → v14 遷移清單

## 既有設定怎麼改

以下路徑除註明「頂層」外，皆位於 `kikiutilsNuxt`。

| 舊設定 | 處理方式 |
|---|---|
| `enabledModules.vueUse` | 刪除。VueUse 固定啟用，`enabled: false`／`enabledModules: false` 也不會停用它 |
| `autoImportUtils['@kikiutils/shared'].object` | 刪除；依 Shared v19 實際 exports 調整用到的函式 |
| `nuxtConfigOverrides.experimental` | 移到 Nuxt 頂層 `experimental` |
| `nuxtConfigPresets` | 刪除。若仍需要自訂資產檔名，自行設定頂層 Vite output |
| `unoCss.enabledResets` | 刪除。預設仍載入 Tailwind reset；要關閉改設頂層 `unocss.preflight: false` |
| `enabledStyles.reboot: false` | 若原意是關閉全部套件樣式，改為 `enabledStyles: false` |
| `nitro.typescript.tsConfig`（含 overrides 內） | 改用同層的 `typescript.serverTsConfig` |

## 可以清掉的設定

若只是重複啟用預設值，可刪除：

- `autoImportUtils['@kikiutils/shared']` 裡的 `datetime: true`、`enum: true`、`random: true`、`string: true`。
- 只為本套件額外註冊的 `modules: ['@vueuse/nuxt']`；沒有自行 import VueUse 時，也不必為本套件另裝 `@vueuse/core`／`@vueuse/nuxt`。

`elementPlus`、`hash`、`math`、`number`、`precisionNumber` auto-import 仍預設關閉；需要時保留 `true`。

## 新增預設：不需要就明確關閉

- Shared 的 `datetime`、`enum`、`random`、`string` 改為預設開啟，新增的 `enhancedDate`、`time` 也預設開啟；不需要的分組設為 `false`。
- 新增 `enabledStyles.visualPreferences`、`enabledStyles.autofillOverride`，兩者預設 `true`，可分別關閉。
- `unocss.autoImport: false` 時，若需要 Tailwind reset，須自行載入 `@unocss/reset/tailwind.css`。

## 依賴要補什麼

- Nuxt：`^4.6.2`；Node 須符合所安裝 Nuxt 的要求，4.6.2 為 `^22.22.3 || ^24.15.0 || >=26.0.0`。
- Shared：升至 `^19.0.0`。
- 使用 Robots：升至 `@nuxtjs/robots@^7.0.2`，並新增 `nuxt-site-config@^5`。
- 使用 UnoCSS／Unplugin Fonts：分別對齊 `@unocss/nuxt@^66.11.0`／`unplugin-fonts@^2.1.0`。
- 使用 SCSS／typecheck：應用自行宣告 `sass`／`vue-tsc` devDependencies，不再依賴本套件提供。

依 Shared 啟用項目補齊依賴：

| 功能 | 需要的套件 |
|---|---|
| `datetime`、`enhancedDate`（預設開啟） | `date-fns` |
| `hash` | `@noble/hashes` |
| `math`、`precisionNumber` | `decimal.js` |
| `number` | `millify` |
