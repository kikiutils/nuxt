import { defineConfig } from 'tsdown';

export default defineConfig({
    alias: { '@/': './src' },
    clean: true,
    entry: ['./src/index.ts'],
    sourcemap: true,
    tsconfig: './tsconfig.build.json',
    unbundle: true,
});
