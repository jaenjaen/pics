import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSession from 'vue-session';

// import vuetify from "vuetify";

import VueDaumPostcode from "vue-daum-postcode"
import VModal from 'vue-js-modal'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

var sessionOptions = {
    persist: true
};

Vue.use(VueSession, sessionOptions);
Vue.use(VueDaumPostcode);
Vue.use(VModal)