import { antfu } from '@antfu/eslint-config';
import { createBaseConfigs } from '@kikiutils/eslint-config/base';
import { createVsCodeJsonConfigs } from '@kikiutils/eslint-config/json';

export default antfu(
    {
        type: 'lib',
        typescript: true,
    },
    createBaseConfigs(),
    createVsCodeJsonConfigs(),
    { rules: { 'ts/explicit-function-return-type': 'off' } },
);
