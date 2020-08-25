import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
<<<<<<< HEAD
import VueSession from 'vue-session';
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

=======
import VueSession from "vue-session";
>>>>>>> 5f1943977c43c78c8b68240dcc59c11ec6003b4c

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

var sessionOptions = {
    persist: true
}
Vue.use(VueSession, sessionOptions);