<template>
  <h1>m3ripple-vue Demo</h1>
  <div class="card">
    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p>
        Click the button to see the default <code>&lt;Ripple&gt;</code> effect.
      </p>
      <button type="button" class="demo-button">
        Click me!
        <Ripple />
      </button>

      <p>Example with a simple div:</p>
      <div class="demo-div-simple">
        Element <code>div</code> with ripple
        <Ripple />
      </div>
    </section>

    <section class="demo-section">
      <h2>Style Variants</h2>

      <p>Material 2 (<code>:isMaterial3="false"</code>)</p>
      <button type="button" class="demo-button">
        M2 Ripple
        <Ripple :isMaterial3="false" />
      </button>

      <p>Custom Ripple Color (<code>rippleColor="#8e44ad80"</code>)</p>
      <button type="button" class="demo-button purple">
        Purple Ripple
        <Ripple rippleColor="#8e44ad80" />
      </button>

      <p>
        Custom Sparkles Color (<code>sparklesColorRGB="52, 152, 219"</code>)
      </p>
      <button type="button" class="demo-button blue-sparkles">
        Blue Sparkles
        <Ripple sparklesColorRGB="52, 152, 219" />
      </button>
    </section>

    <section class="demo-section">
      <h2>Component Examples</h2>

      <p>Icon Button</p>
      <button type="button" class="demo-icon-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path
            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z"
          />
        </svg>
        <Ripple />
      </button>

      <p>Link (<code>&lt;a&gt;</code> tag)</p>
      <a href="https://m3ripple.swuerpy.com" class="demo-link">
        I'm a link!
        <Ripple />
      </a>
    </section>

    <section class="demo-section">
      <h2>Card with Ripple</h2>
      <div class="demo-card">
        <img src="/vite.svg" alt="Vite Logo" class="card-image" />
        <div class="card-content">
          <h3>Interactive Card</h3>
          <p>Click anywhere on this card.</p>
        </div>
        <Ripple />
      </div>
    </section>

    <section class="demo-section">
      <h2>Advanced Props</h2>

      <p>Callback (<code>:beforeRippleFn</code>)</p>
      <button type="button" class="demo-button" @click="logClick">
        Check Console Log
        <Ripple :beforeRippleFn="handleBeforeRipple" />
      </button>

      <p>Sparkle Density (<code>:sparklesMaxCount="100"</code>)</p>
      <button type="button" class="demo-button">
        Low Sparkles
        <Ripple :sparklesMaxCount="100" />
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
function handleBeforeRipple() {
  console.log("beforeRippleFn callback executed!");
}
function logClick() {
  console.log("Button click event fired!");
}
</script>

<style scoped>
.demo-div-simple {
  position: relative;
  border-radius: 16px;
  margin-top: 1rem;
  background: hsla(0, 0%, 100%, 0.06);
  display: inline-block;
  padding: 2em;
  cursor: pointer;
}

.demo-section {
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
.demo-section:last-child {
  border-bottom: none;
}

.demo-section h2 {
  text-align: left;
  margin-top: 0;
}

.demo-section p {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-align: left;
}

.demo-button,
.demo-link,
.demo-icon-button {
  margin: 0.25rem;
}

.demo-button.purple {
  background-color: #8e44ad;
  border-color: #70368a;
}
.demo-button.blue-sparkles {
  background-color: #2980b9;
  border-color: #20638f;
}

.demo-icon-button {
  position: relative;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.demo-icon-button svg {
  width: 24px;
  height: 24px;
}

.demo-link {
  position: relative;
  display: inline-block;
  padding: 0.6em 1.2em;
  border-radius: 20px;
  background-color: #1a1a1a;
  border: 1px solid transparent;
  transition: border-color 0.25s;
  color: #646cff;
  text-decoration: none;
}
.demo-link:hover {
  border-color: #646cff;
}

.demo-card {
  position: relative;
  max-width: 300px;
  padding: 2rem;
  border-radius: 16px;
  background: hsla(0, 0%, 100%, 0.06);
  cursor: pointer;
  margin: 1rem auto;
  text-align: left;
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}

.card-content {
  padding-top: 2rem;
}

.card-content h3,
.card-content p {
  margin: 0;
}
</style>
