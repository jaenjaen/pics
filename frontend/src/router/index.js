import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StudioSearch from "../components/StudioSearch.vue";
import CustomerLogin from "../views/CustomerLogin.vue";
import CompanyLogin from "../views/CompanyLogin.vue"
import RegisterStudio from "../components/RegisterStudio.vue";
import TempStudio from "../components/Temp_MoveToInfo.vue";
import StudioInfo from "../components/StudioInfo.vue";
import Register from "../views/Register.vue";

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
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/studioSearch",
        name: "studioSearch",
        component: StudioSearch
    },
    {
        path: "/customerlogin",
        name: "customerlogin",
        component: CustomerLogin
    },
    {
        path: "/companylogin",
        name: "companylogin",
        component: CompanyLogin
    },
    {
        path: "/registerStudio",
        name: "registerStudio",
        component: RegisterStudio
    }, {
        path: "/studioInfo",
        name: "studioInfo",
        component: StudioInfo
    }, {
        path: "/register",
        name: "register",
        component: Register
    }, {
        path: "/TempStudio/:stuId",
        name: "TempStudio",
        component: TempStudio,
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;