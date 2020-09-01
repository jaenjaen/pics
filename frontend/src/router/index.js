import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/main/Main.vue";
import StudioSearch from "../components/search/StudioSearch.vue";
import CustomerLogin from "../views/login/CustomerLogin.vue";
import CompanyLogin from "../views/login/CompanyLogin.vue";
// import RegisterStudio from "../components/RegisterStudio.vue";
import RegisterStudio from "@/components/studioRegister/RegisterStudio.vue";
import RegisterStudioSuccess from "@/components/studioRegister/RegisterStudioSuccess.vue";
import Register from "../views/Register.vue";
import Reservation from "../components/studioInfo/Reservation.vue";
import StudioInfo from "../components/studioInfo/StudioInfo.vue";
import Mypage from "../views/Mypage.vue";
import WishList from "../views/WishList.vue";
// import Map from "../components/Map.vue";
// import Test from "../components/Test.vue";
import ChartGender from "../components/studioInfo/ChartGender.vue";
import StudioList from "@/components/search/StudioList.vue";

Vue.use(VueRouter);
const routes = [{
        path: "/",
        name: "pics-main",
        component: Main
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
        path: "/registerStudioSuccess",
        name: "registerStudioSuccess",
        component: RegisterStudioSuccess
    }, {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/mypage",
        name: "mypage",
        component: Mypage
    },
    {
        path: "/wishlist",
        name: "wishlist",
        component: WishList
    },
    {
        path: "/reservation",
        name: "reservation",
        component: Reservation
    },
    {
        path: "/studioInfo/:stuId",
        name: "studioInfo",
        component: StudioInfo,
        props: true
    }, {
        path: "/chartgender",
        name: "chartgender",
        component: ChartGender
    }, {
        path: "/studioList",
        name: "studioList",
        component: StudioList
    }


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