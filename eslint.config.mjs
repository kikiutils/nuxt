import { createConfig } from '@kikiutils/eslint-config';

export default createConfig(
    'node',
    {
        formatters: { css: true },
        type: 'lib',
        vue: true,
    },
).overrideRules({ 'ts/explicit-function-return-type': 'off' });
