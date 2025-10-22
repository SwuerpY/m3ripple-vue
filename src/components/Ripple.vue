<script setup lang="ts">
import { ref, useCssModule } from "vue";
import {
  offsetXFromCurrent,
  offsetYFromCurrent,
  rippleElemWidthOriginal,
} from "../ripple/utils";
import RippleInstance from "./base/RippleInstance.vue";

export type RippleObj = {
  ripple_width: number;
  offsetY: number;
  offsetX: number;
  time: number;
  isMaterial3: boolean;
  tobeDeleted: boolean;
};

const props = withDefaults(
  defineProps<{
    isMaterial3?: boolean;
    beforeRippleFn?: (event: MouseEvent | TouchEvent) => void;
    rippleColor?: string;
    sparklesColorRGB?: string;
    opacity_level1?: string;
    opacity_level2?: string;
    sparklesMaxCount?: number;
  }>(),
  {
    isMaterial3: true,
    beforeRippleFn: () => {},
    rippleColor: "#ffffff35",
    sparklesColorRGB: "255 255 255",
    opacity_level1: "0.2",
    opacity_level2: "0.1",
    sparklesMaxCount: 2048,
  }
);

const ripples = ref<RippleObj[]>([]);
const isScroll = ref(false);
const disableClickedRipple = ref(false);

function ripplePerform(
  rippleWidthOriginal: number | undefined,
  offsetX: number,
  offsetY: number,
  isTouch = false
) {
  if (disableClickedRipple.value && !isTouch) {
    return;
  }
  if (!rippleWidthOriginal) {
    return;
  }

  // ripple width looks smaller than real width because of the gradient background
  const ripple_width = rippleWidthOriginal / 0.8;
  // UNIX time
  const time = new Date().getTime();

  ripples.value.push({
    ripple_width: ripple_width,
    offsetX: offsetX,
    offsetY: offsetY,
    time: time,
    isMaterial3: props.isMaterial3,
    tobeDeleted: false,
  });
}

async function rippleDeletionReservation(event: MouseEvent | TouchEvent) {
  if (event.type === "touchend" || event.type === "touchcancel") {
    // The ripple effect on the tap starts late, so delay it
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (ripples.value.length === 0) return;

  ripples.value = ripples.value.map((item) => {
    return { ...item, tobeDeleted: true };
  });

  isScroll.value = false;
}

// called from children (ripple)
function deleteRipple(createdTime: number) {
  ripples.value = ripples.value.filter((item) => {
    return item.time !== createdTime;
  });
}

function handleMouseDown(event: MouseEvent) {
  if (disableClickedRipple.value) {
    return;
  }
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  const original = rippleElemWidthOriginal(
    rect,
    event.clientX,
    event.clientY,
    target.clientWidth,
    target.clientHeight
  );
  const offsetX = offsetXFromCurrent(rect, event.clientX);
  const offsetY = offsetYFromCurrent(rect, event.clientY);

  // process before ripple
  if (props.beforeRippleFn) props.beforeRippleFn(event);
  ripplePerform(original, offsetX, offsetY);
}

async function handleTouchStart(event: TouchEvent) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  const touch = event.changedTouches?.[0];
  if (!touch) return;

  const original = rippleElemWidthOriginal(
    rect,
    touch.clientX,
    touch.clientY,
    target.clientWidth,
    target.clientHeight
  );

  const offsetX = offsetXFromCurrent(rect, touch.clientX);
  const offsetY = offsetYFromCurrent(rect, touch.clientY);

  disableClickedRipple.value = true;

  // wait to check if this is a scroll
  await new Promise((resolve) => setTimeout(resolve, 100));

  setTimeout(() => {
    disableClickedRipple.value = false;
  }, 1000);

  if (!isScroll.value) {
    // process before ripple
    if (props.beforeRippleFn) props.beforeRippleFn(event);
    ripplePerform(original, offsetX, offsetY, true);
  }

  isScroll.value = false;
}

function cancelRipplePerformTouch() {
  isScroll.value = true;
}

const $style = useCssModule();
</script>

<template>
  <span
    :class="$style.rippleOverlay"
    @mousedown="handleMouseDown"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="cancelRipplePerformTouch"
    @touchend="rippleDeletionReservation"
    @touchcancel="rippleDeletionReservation"
    @mouseup="rippleDeletionReservation"
    @mouseleave="rippleDeletionReservation"
  >
    <RippleInstance
      v-for="ripple in ripples"
      :key="ripple.time"
      :time="ripple.time"
      :ripple_width="ripple.ripple_width"
      :offset-x="ripple.offsetX"
      :offset-y="ripple.offsetY"
      :is-material3="ripple.isMaterial3"
      :tobe-deleted="ripple.tobeDeleted"
      :ripple-color="props.rippleColor"
      :sparkles-color-r-g-b="props.sparklesColorRGB"
      :opacity_level1="props.opacity_level1"
      :opacity_level2="props.opacity_level2"
      :sparkles-max-count="props.sparklesMaxCount"
      @delete-ripple="deleteRipple"
    />
  </span>
</template>

<style module>
.rippleOverlay {
  border-radius: inherit;
  position: absolute;
  inset: 0;
  overflow: hidden;
}
</style>
