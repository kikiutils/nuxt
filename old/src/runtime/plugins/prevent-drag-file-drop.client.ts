import { defineNuxtPlugin } from '#app';

function onEvent(this: Window, event: DragEvent) {
    for (const item of event.dataTransfer?.items || []) {
        if (item.kind === 'file') {
            event.preventDefault();
            break;
        }
    }
}

export default defineNuxtPlugin(() => {
    window.addEventListener('dragover', onEvent);
    window.addEventListener('drop', onEvent);
});
