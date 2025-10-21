<template>
  <h1>m3ripple-vue Demo</h1>

  <div class="card">
    <p>
      Click the button to see the <code>&lt;RippleContainer&gt;</code> effect
    </p>

    <RippleContainer :class="['demo-button-container']">
      <button type="button" class="demo-button">Click me!</button>
    </RippleContainer>

    <p>Example with a div:</p>

    <RippleContainer :class="['demo-div-container']">
      <div class="demo-div">Element <code>div</code> with ripple</div>
    </RippleContainer>

    <p>Example with Material 2</p>

    <RippleContainer :isMaterial3="false" :class="['demo-button-container']">
      <button type="button" class="demo-button">Click me!</button>
    </RippleContainer>
  </div>
</template>

<style scoped>
.demo-button-container {
  border-radius: 20px;
  width: auto;
  display: inline-block;
}
.demo-button-container:hover {
  border-color: #646cff;
}

.demo-div-container {
  border-radius: 16px;
  margin-top: 1rem;
  background: hsla(0, 0%, 100%, 0.06);
  display: inline-block;
}
.demo-div {
  padding: 2em;
  cursor: pointer;
}
</style>
