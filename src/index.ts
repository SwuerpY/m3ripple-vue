import type { App } from "vue";
import Ripple from "./components/Ripple.vue";

export { Ripple };

export default {
  install(app: App) {
    app.component("Ripple", Ripple);
  },
};
