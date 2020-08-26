import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSession from 'vue-session';
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
var sessionOptions = {
    persist: true
};
Vue.use(VueSession, sessionOptions);