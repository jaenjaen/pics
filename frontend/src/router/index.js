import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StudioSearch from "../components/StudioSearch.vue"
import CustomerLogin from "../views/CustomerLogin.vue";
import CompanyLogin from "../views/CompanyLogin.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue") <<
            <<
            <<
            <
            HEAD
    },
    {
        path: "/studioSearch",
        name: "studioSearch",
        component: StudioSearch
    }, {
        path: "/customerlogin",
        name: "customerlogin",
        component: CustomerLogin
    }, {
        path: "/companylogin",
        name: "companylogin",
        component: CompanyLogin
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;