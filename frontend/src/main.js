import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueDaumPostcode from "vue-daum-postcode";
import VModal from "vue-js-modal";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;

Vue.use(VueDaumPostcode);
Vue.use(VModal);