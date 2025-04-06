import {
    onActivated,
    ref,
} from 'vue';
import type { Ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

export function useScrollMemory(containerRef: Ref<HTMLElement | null>) {
    const scrollLeft = ref(0);
    const scrollTop = ref(0);
    onActivated(() => {
        if (!containerRef.value) return;
        containerRef.value.scrollLeft = scrollLeft.value;
        containerRef.value.scrollTop = scrollTop.value;
    });

    onBeforeRouteLeave(() => {
        scrollLeft.value = containerRef.value?.scrollLeft || 0;
        scrollTop.value = containerRef.value?.scrollTop || 0;
    });
}
