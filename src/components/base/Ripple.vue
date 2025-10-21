<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import SparklesCanvas from "./SparklesCanvas.vue";

const props = withDefaults(
  defineProps<{
    ripple_width: number;
    offsetX: number;
    offsetY: number;
    time: number;
    tobeDeleted: boolean;
    isMaterial3?: boolean;
    rippleColor?: string;
    rippleTime?: number;
    waitingTime?: number;
    sparklesColorRGB?: string;
    opacity_level1?: string;
    opacity_level2?: string;
    sparklesMaxCount?: number;
  }>(),
  {
    isMaterial3: true,
    rippleColor: "#ffffff35",
    rippleTime: 500,
    // waiting time for ripple animation
    waitingTime: 290,
    sparklesColorRGB: "255 255 255",
    opacity_level1: "0.2",
    opacity_level2: "0.1",
    sparklesMaxCount: 2048,
  }
);

const emit = defineEmits<{
  (e: "deleteRipple", time: number): void;
}>();

const rippleRef = ref<HTMLSpanElement | null>(null);
const anim = ref<Animation | undefined>(undefined);
const inDeletionProgress = ref(false);
const isAnimStarted = ref(false);
const fadeOutAnim = ref<Animation | undefined>(undefined);

// Cleanup function to cancel animations
function cleanupAnimations() {
  if (anim.value) {
    anim.value.cancel();
  }
  if (fadeOutAnim.value) {
    fadeOutAnim.value.cancel();
  }
}

async function deletion() {
  if (rippleRef.value && anim.value) {
    // wait for animation finish / threshold
    if ((anim.value.currentTime as number) < props.waitingTime) {
      const remainTimeNow =
        props.rippleTime - (anim.value.currentTime as number);
      const waitTimeMS = remainTimeNow - props.waitingTime;
      await new Promise((resolve) => {
        setTimeout(resolve, waitTimeMS);
      });
    } else {
      await anim.value.finished;
    }

    if (!rippleRef.value) {
      return;
    }
    // fade-out animation
    fadeOutAnim.value = rippleRef.value.animate(
      {
        opacity: [1, 0],
      },
      {
        fill: "forwards",
        duration: props.isMaterial3 ? 200 : 200,
        easing: props.isMaterial3
          ? "cubic-bezier(0.11, 0, 0.5, 0)"
          : "cubic-bezier(0.11, 0, 0.5, 0)",
      }
    );
    await fadeOutAnim.value.finished;
  }
  // parent setRipples process here
  emit("deleteRipple", props.time);
}

onMounted(() => {
  if (!props.tobeDeleted && rippleRef.value) {
    anim.value = rippleRef.value.animate(
      {
        width: props.isMaterial3
          ? [`${props.ripple_width / 6}px`, `${props.ripple_width}px`]
          : [`${props.ripple_width / 3}px`, `${props.ripple_width}px`],
        height: props.isMaterial3
          ? [`${props.ripple_width / 6}px`, `${props.ripple_width}px`]
          : [`${props.ripple_width / 3}px`, `${props.ripple_width}px`],
        background: props.isMaterial3
          ? [
              `radial-gradient(circle closest-side, ${props.rippleColor} 0%, transparent)`,
              `radial-gradient(circle closest-side, ${props.rippleColor} 80%, transparent)`,
            ]
          : [props.rippleColor, props.rippleColor],
      },
      {
        fill: "forwards",
        duration: props.isMaterial3 ? 400 : props.rippleTime,
        easing: props.isMaterial3
          ? "cubic-bezier(0,0.49,0,1)"
          : "cubic-bezier(0.1, 0.8, 1, 0.80)",
      }
    );

    const setOnStarted = async () => {
      await anim.value?.ready;
      isAnimStarted.value = true;
    };
    setOnStarted();
  }
});

watch(
  () => props.tobeDeleted,
  (isDeleting) => {
    if (isDeleting) {
      if (!inDeletionProgress.value) {
        inDeletionProgress.value = true;
        deletion();
      }
    }
  }
);

onBeforeUnmount(() => {
  cleanupAnimations();
});
</script>

<template>
  <span
    ref="rippleRef"
    :class="$style.ripple"
    :style="{
      width: `${ripple_width}px`,
      height: `${ripple_width}px`,
      left: `${offsetX}px`,
      top: `${offsetY}px`,
    }"
  >
    <SparklesCanvas
      v-if="isMaterial3 && isAnimStarted"
      :ripple_width="ripple_width"
      :ripple-ref="rippleRef"
      :sparkles-color-r-g-b="sparklesColorRGB"
      :opacity_level1="opacity_level1"
      :opacity_level2="opacity_level2"
      :sparkles-max-count="sparklesMaxCount"
    />
  </span>
</template>

<style module>
.ripple {
  position: absolute;
  border-radius: 100%;
  z-index: 2;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>
