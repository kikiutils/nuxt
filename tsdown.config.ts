import { defineConfig } from 'tsdown';

export default defineConfig({
    clean: true,
    entry: ['./src/index.ts'],
    sourcemap: true,
    tsconfig: './tsconfig.build.json',
    unbundle: true,
});
