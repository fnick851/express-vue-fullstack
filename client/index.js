import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";

import App from "./src/App";

Vue.use(VueCompositionApi);

new Vue({
  el: "#app",
  render: h => h(App)
});
