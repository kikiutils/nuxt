import { fileURLToPath } from 'node:url';

import {
    $fetch,
    setup,
} from '@nuxt/test-utils/e2e';
import {
    describe,
    it,
} from 'vitest';

describe('ssr', async () => {
    await setup({ rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)) });

    it('renders the index page', async ({ expect }) => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/');
        expect(html).toContain('<div>basic</div>');
    });
});
