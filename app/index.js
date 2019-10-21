import "core-js/stable"
import "regenerator-runtime/runtime"

import Vue from "vue"
import App from "./src/App"

new Vue({
    el: "#app",
    render: h => h(App)
})
