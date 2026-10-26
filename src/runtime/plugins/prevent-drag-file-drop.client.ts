import { defineNuxtPlugin } from '#app';

function preventFileDrop(event: DragEvent) {
    if (event.dataTransfer?.types.includes('Files')) event.preventDefault();
}

export default defineNuxtPlugin((nuxtApp) => {
    const controller = new AbortController();
    for (const eventName of [
        'dragover',
        'drop',
    ] as const) {
        window.addEventListener(
            eventName,
            preventFileDrop,
            {
                capture: true,
                passive: false,
                signal: controller.signal,
            },
        );
    }

    const stop = () => controller.abort();
    nuxtApp.vueApp.onUnmount(stop);
    if (import.meta.hot) import.meta.hot.dispose(stop);
});
