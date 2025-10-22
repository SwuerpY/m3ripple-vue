<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { drawSparkles, type Sparkles } from "../../ripple/sparkles";

const props = withDefaults(
  defineProps<{
    ripple_width: number;
    rippleRef: HTMLSpanElement | null;
    sparklesColorRGB?: string;
    sparklesMaxCount?: number;
    opacity_level1?: string;
    opacity_level2?: string;
  }>(),
  {
    sparklesColorRGB: "255 255 255",
    sparklesMaxCount: 2048,
    opacity_level1: "0.2",
    opacity_level2: "0.1",
  }
);

const animIdRef = ref<number | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasAnim = ref<Animation | undefined>(undefined);
let isAnimating = false;

// Cleanup function
function cleanup() {
  isAnimating = false;
  if (animIdRef.value !== null) {
    cancelAnimationFrame(animIdRef.value);
    animIdRef.value = null;
  }
  if (canvasAnim.value) {
    canvasAnim.value.cancel();
    canvasAnim.value = undefined;
  }
}

onMounted(() => {
  const pixelRatio = window.devicePixelRatio;
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  canvas.width = Math.floor(props.ripple_width * pixelRatio);
  canvas.height = Math.floor(props.ripple_width * pixelRatio);

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const sparkles_collection: Sparkles[] = [];
  context.scale(pixelRatio, pixelRatio);

  isAnimating = true;

  // Start the sparkles animation loop
  const animate = () => {
    if (!isAnimating || !props.rippleRef) {
      return;
    }

    drawSparkles(
      sparkles_collection,
      context,
      props.rippleRef,
      props.ripple_width,
      {
        rgb: props.sparklesColorRGB,
        opacity_level1: props.opacity_level1,
        opacity_level2: props.opacity_level2,
      },
      6,
      props.sparklesMaxCount
    );

    animIdRef.value = requestAnimationFrame(animate);
  };

  // Start animation
  animIdRef.value = requestAnimationFrame(animate);

  // Fade out the canvas
  canvasAnim.value = canvas.animate(
    {
      opacity: [1, 0],
    },
    {
      fill: "forwards",
      duration: 600,
    }
  );
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <canvas
    ref="canvasRef"
    :style="{
      width: `${ripple_width}px`,
      height: `${ripple_width}px`,
    }"
    :class="$style.sparkles_canvas"
  />
</template>

<style module>
.sparkles_canvas {
  position: absolute;
  user-select: none;
}
</style>
