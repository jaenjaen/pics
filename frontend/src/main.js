import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSession from 'vue-session';
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import vuetify from "./plugins/vuetify";

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