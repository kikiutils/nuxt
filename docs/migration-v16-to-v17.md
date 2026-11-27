# v16 → v17 遷移清單

以下路徑皆位於 `kikiutilsNuxt`。

## 依賴

- Shared：升至 `^22.0.0`。
- 只為 `number` 安裝的 `millify` 可移除。

## 既有設定怎麼改

| 舊設定 | 處理方式 |
|---|---|
| `autoImportUtils['@kikiutils/shared'].number` | 刪除。原本的數字縮寫改用 `new Intl.NumberFormat('en', { maximumFractionDigits: 2, notation: 'compact' }).format(value).toLowerCase()` |

## Shared 行為變更

- `string`（預設開啟）：`randomString` 不再 auto-import，改用 nanoid 的 `customAlphabet`。
- `clipboard`（預設開啟）：`copyTextToClipboard`／`copyBlobToClipboard` 改為回傳 `boolean`，原本判斷 `result.ok` 改為直接判斷回傳值。
- `precisionNumber`：只接受純十進位字串，指數、hex、`NaN`、`Infinity` 會拋 `TypeError`；不可信輸入改用 `PrecisionNumber.tryFrom`。
