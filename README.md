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

### Usage

Import the `<Ripple />` component and place it **inside** any element you want to add the effect to.

**IMPORTANT**: The parent element (`<button>`, `<div>`, etc.) **must** have its CSS `position` set to `relative`, `absolute`, `fixed`, or `sticky`.

```vue
<script setup lang="ts">
import { Ripple } from "m3ripple-vue";
</script>

<template>
  <button class="my-button">
    Click Me!
    <Ripple />
  </button>
</template>

<style>
.my-button {
  /* This is required for the ripple to position correctly */
  position: relative;

  /* Your other styles */
  border-radius: 20px;
  padding: 12px 24px;
  border: none;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
}
</style>
```

## Examples

### Basic Button

```vue
<button class="demo-button">
  Click me!
  <Ripple />
</button>

<style>
.demo-button {
  position: relative;
  border-radius: 20px;
}
</style>
```

### Interactive Card (div)

```vue
<div class="demo-card">
  <h3>Interactive Card</h3>
  <p>Click anywhere on this card.</p>
  <Ripple />
</div>

<style>
.demo-card {
  position: relative;
  border-radius: 16px;
  background: hsla(0, 0%, 100%, 0.06);
  cursor: pointer;
}
</style>
```

### Style Variants (Props)

```vue
<button class="demo-button">
  M2 Ripple
  <Ripple :isMaterial3="false" />
</button>

<button class="demo-button">
  Purple Ripple
  <Ripple rippleColor="#8e44ad80" />
</button>

<button class="demo-button">
  Blue Sparkles
  <Ripple sparklesColorRGB="52, 152, 219" />
</button>
```

## Props

<div align="center">

| Property           | optional | explanation                                                                                                                        | default         | type                                        |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------- |
| `isMaterial3`      | yes      | Use Material 3 ripple style (with sparkles). Set to `false` for M2 style.                                                          | `true`          | `boolean`                                   |
| `beforeRippleFn`   | yes      | Function executed just before the ripple animation starts. Useful for coordinated effects (e.g., press shadow).                    | `()=>{}`        | `(event: MouseEvent \| TouchEvent) => void` |
| `rippleColor`      | yes      | Color of the ripple circle. Use `rgba` or `hsla` with transparency to see overlaps on multiple clicks.                             | `"#ffffff35"`   | `string`                                    |
| `sparklesColorRGB` | yes      | Color of the sparkles (M3 only) as space-separated RGB (e.g., `"255 0 128"`). Does not support transparency.                       | `"255 255 255"` | `string`                                    |
| `opacity_level1`   | yes      | Transparency level 1 for sparkles before they disappear. The initial opacity is calculated based on the ripple's current progress. | `"0.2"`         | `string`                                    |
| `opacity_level2`   | yes      | Transparency level 2 for sparkles just before they disappear. Applied after `opacity_level1`.                                      | `"0.1"`         | `string`                                    |
| `sparklesMaxCount` | yes      | Maximum number of sparkle dots to render. Higher values create denser sparkle effects but may impact performance.                  | `2048`          | `number`                                    |

</div>
