<h1 align="center">✨ m3ripple for vue</h1>
<p align="center">Bring Material 3(You) Ripple Effect to your <b>Vue</b> projects!</p>
<div align="center">

[![NPM Version](https://img.shields.io/npm/v/m3ripple-vue?style=for-the-badge&logo=npm&logoColor=white&labelColor=%230d0b13&color=%2318151e)](https://www.npmjs.com/package/m3ripple-vue)
[![npm package minimized gzipped size (scoped)](https://img.shields.io/bundlejs/size/m3ripple-vue?style=for-the-badge&labelColor=%230d0b13&color=%2318151e)](#)
[![GitHub License](https://img.shields.io/github/license/swuerpy/m3ripple-vue?style=for-the-badge&labelColor=%230d0b13&color=%2318151e)](https://github.com/SwuerpY/m3ripple-vue/blob/main/LICENSE.txt)
[![GitHub Repo stars](https://img.shields.io/github/stars/swuerpy/m3ripple-vue?style=for-the-badge&labelColor=%230d0b13&color=%2318151e)](#)

> **Note:** This is a Vue 3 port of the original React project [m3ripple](https://github.com/yuyake-litrain/m3ripple) (MIT license) created by [Litrain](https://github.com/yuyake-litrain).

</div>
<div align="center"><a href="https://m3ripple.swuerpy.com/"><b>Live Demo</b></a></div><br />

<div align="center">
  <video src="https://github.com/user-attachments/assets/5b8cd5e6-5c91-4ca1-bc4d-50d5781a8be9" />
</div>
  
## Features
- ✨ Ripple Effect with sparkle easily realized on the web
- 😍 Well-tuned behavior with no faltering
- 🎨 Highly customizable in terms of ripple color, number of sparkles, clarity, etc.
- ⚡ High speed drawing for Sparkles by canvas
- ✅ Ripple effect in Material 2 is also supported

## Getting Started

### Install

```bash
# npm
npm install m3ripple-vue

# pnpm
pnpm add m3ripple-vue

# yarn
yarn add m3ripple-vue

# bun
bun add m3ripple-vue
```

### Use

Import the `<RippleContainer>` component and its necessary CSS. Wrap any element you want to add the ripple effect to with `<RippleContainer>`.

#### Example

```vue
<script setup lang="ts">
import { RippleContainer } from "m3ripple-vue";
// Import the required styles
import "m3ripple-vue/style.css";

// Optional: Define a function to run just before the ripple animation starts
const handleBeforeRipple = (event: MouseEvent | TouchEvent) => {
  console.log("Ripple effect triggered!", event);
  // You could add logic here, e.g., apply a temporary style
};
</script>

<template>
  <RippleContainer
    :isMaterial3="true"
    :beforeRippleFn="handleBeforeRipple"
    class="my-button-wrapper"
    rippleColor="rgba(255, 255, 255, 0.2)"
    sparklesColorRGB="255 255 255"
  >
    <button class="my-button">Click Me!</button>
  </RippleContainer>

  <RippleContainer class="my-card-wrapper">
    <div class="my-card-content">Clickable Card Content</div>
  </RippleContainer>
</template>

<style>
/* Style the wrapper (RippleContainer) */
.my-button-wrapper {
  display: inline-block; /* Adjusts size to content */
  border-radius: 20px; /* Example styling */
  cursor: pointer; /* Indicate interactivity */
  user-select: none; /* Prevent text selection during click */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
}

/* Style the inner element (the button) */
.my-button {
  padding: 12px 24px;
  border: none;
  background-color: #3f51b5; /* Example color */
  color: white;
  font-size: 16px;
}

/* Example for a div/card */
.my-card-wrapper {
  display: inline-block;
  border-radius: 16px; /* Example styling */
  margin-top: 1rem;
  background: hsla(0, 0%, 100%, 0.06); /* Example background */
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.my-card-content {
  padding: 20px;
}
</style>
```

<div align="center">

| Property           | optional | explanation                                                                                                                        | default         | type                                        |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------- |
| `isMaterial3`      | yes      | Use Material 3 ripple style (with sparkles). Set to `false` for M2 style.                                                          | `true`          | `boolean`                                   |
| `beforeRippleFn`   | yes      | Function executed just before the ripple animation starts. Useful for coordinated effects (e.g., press shadow).                    | `()=>{}`        | `(event: MouseEvent \| TouchEvent) => void` |
| `className`        | yes      | Additional CSS class(es) to apply to the ripple container. Can be a string with space-separated classes.                           | `""`            | `string`                                    |
| `rippleColor`      | yes      | Color of the ripple circle. Use `rgba` or `hsla` with transparency to see overlaps on multiple clicks.                             | `"#ffffff35"`   | `string`                                    |
| `sparklesColorRGB` | yes      | Color of the sparkles (M3 only) as space-separated RGB (e.g., `"255 0 128"`). Does not support transparency.                       | `"255 255 255"` | `string`                                    |
| `opacity_level1`   | yes      | Transparency level 1 for sparkles before they disappear. The initial opacity is calculated based on the ripple's current progress. | `"0.2"`         | `string`                                    |
| `opacity_level2`   | yes      | Transparency level 2 for sparkles just before they disappear. Applied after `opacity_level1`.                                      | `"0.1"`         | `string`                                    |
| `sparklesMaxCount` | yes      | Maximum number of sparkle dots to render. Higher values create denser sparkle effects but may impact performance.                  | `2048`          | `number`                                    |

</div>

_**Important styling notes:**_

- The `<RippleContainer>` **automatically handles** `position: relative`, `overflow: hidden`, and `z-index` internally - you don't need to add these.
- The element inside (button, div, etc.) will automatically be positioned with `z-index: 1` to allow the ripple to appear on top.
- You can add event listeners like `@click` to the inner element (button, div) rather than to `<RippleContainer>` to avoid conflicts with ripple's internal listeners.
- Only add your custom styling (colors, border-radius, padding, etc.) to the wrapper or inner elements.
