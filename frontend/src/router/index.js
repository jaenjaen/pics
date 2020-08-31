import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import StudioSearch from "../components/StudioSearch.vue";
import CustomerLogin from "../views/CustomerLogin.vue";
// import RegisterStudio from "../components/RegisterStudio.vue";
import RegisterStudio from "../components/RegisterStudio.vue";
import Register from "../views/Register.vue";
import CompanyLogin from "../views/CompanyLogin.vue";
import Reservation from "../components/Reservation.vue";
import StudioInfo from "../components/StudioInfo.vue";
import Mypage from "../views/Mypage.vue";
import WishList from "../views/WishList.vue";
import Test from "../components/Test.vue";
// import Map from "../components/Map.vue";

Vue.use(VueRouter);
const routes = [{
        path: "/",
        name: "pics-main",
        component: Main
    }, {
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
    }, {
        path: "/registerStudio",
        name: "registerStudio",
        component: RegisterStudio
    }, {
        path: "/register",
        name: "register",
        component: Register

    }, {
        path: "/test",
        name: "test",
        component: Test
    }, {
        path: "/mypage",
        name: "mypage",
        component: Mypage
    }, {
        path: "/wishlist",
        name: "wishlist",
        component: WishList
    },
    {
        path: "/reservation",
        name: "reservation",
        component: Reservation
    }, {
        path: "/studioInfo/:stuId",
        name: "studioInfo",
        component: StudioInfo,
        props: true,
    },
    // {
    //     path: "/Map",
    //     name: "Map",
    //     component: Map
    // }
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
export default router;