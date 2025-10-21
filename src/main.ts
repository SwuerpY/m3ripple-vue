import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import M3RippleVue from "./index";

const app = createApp(App);

app.use(M3RippleVue);

app.mount("#app");
