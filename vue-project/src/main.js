import Tres from "@tresjs/core";

import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/base.css";
createApp(App).use(Tres).mount("#app");
