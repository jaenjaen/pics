import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import StudioSearch from "../components/StudioSearch.vue";
import CustomerLogin from "../views/CustomerLogin.vue";
<<<<<<< HEAD
// import RegisterStudio from "../components/RegisterStudio.vue";
=======
import RegisterStudio from "../components/RegisterStudio.vue";
>>>>>>> a3248ecf7393f89b3233dc158f8fb690230d0fb3
import Register from "../views/Register.vue";
import CompanyLogin from "../views/CompanyLogin.vue";
import Reservation from "../components/Reservation.vue";
import StudioInfo from "../components/StudioInfo.vue";
import Mypage from "../views/Mypage.vue";
import WishList from "../views/WishList.vue";
import Test from "../components/Test.vue";
// import Map from "../components/Map.vue";
<<<<<<< HEAD
import temp from "../components/temp.vue";
=======
import Test from "../components/Test.vue";
>>>>>>> a3248ecf7393f89b3233dc158f8fb690230d0fb3

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
<<<<<<< HEAD
    {
        path: "/temp/:stuId",
        name: "temp",
        component: temp,
        props: true
    },


=======
>>>>>>> a3248ecf7393f89b3233dc158f8fb690230d0fb3
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
export default router;