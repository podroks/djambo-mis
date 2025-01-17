import Tres from "@tresjs/core";

import { createApp } from "vue";
import App from "./App.vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import "@/assets/main.css"

/* add icons to the library */
library.add(fas, far, fab)

import "@/assets/base.css";
createApp(App).use(Tres).mount("#app");
