import type { App } from "vue";
import RippleContainer from "./components/RippleContainer.vue";

export { RippleContainer };

export default {
  install(app: App) {
    app.component("RippleContainer", RippleContainer);
  },
};
