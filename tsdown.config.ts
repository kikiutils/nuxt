import { defineConfig } from 'tsdown';

export default defineConfig({
    alias: { '@/': './src' },
    clean: true,
    dts: true,
    entry: ['./src/index.ts'],
    exports: true,
    format: 'esm',
    publint: true,
    sourcemap: true,
    tsconfig: './tsconfig.build.json',
    unbundle: true,
    unused: true,
});
