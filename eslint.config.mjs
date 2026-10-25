import { antfu } from '@antfu/eslint-config';
import { createBaseConfigs } from '@kikiutils/eslint-config/base';
import { createStyleFilesConfigs } from '@kikiutils/eslint-config/style';
import { createVueConfig } from '@kikiutils/eslint-config/vue';

export default antfu(
    {
        formatters: { css: true },
        type: 'lib',
        typescript: true,
        vue: true,
    },
    createBaseConfigs(),
    createStyleFilesConfigs(),
    createVueConfig(),
    { rules: { 'ts/explicit-function-return-type': 'off' } },
);
