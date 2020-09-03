import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/main/Main.vue";
import StudioSearch from "../components/search/StudioSearch.vue";
import CompanyRegister from "../views/register/CompanyRegister.vue";
import CustomerRegister from "../views/register/CustomerRegister.vue";
import CustomerLogin from "../views/login/CustomerLogin.vue";
import CompanyLogin from "../views/login/CompanyLogin.vue";
import Mypage from "../views/mypage/Mypage.vue";
import CompanyEdit from "../views/mypage/edit/CompanyEdit.vue";
import CustomerEdit from "../views/mypage/edit/CustomerEdit.vue";
import WishList from "../views/WishList.vue";
import RegisterStudio from "@/components/studioRegister/RegisterStudio.vue";
import RegisterStudioSuccess from "@/components/studioRegister/RegisterStudioSuccess.vue";
import StudioInfo from "../components/studioInfo/StudioInfo.vue";
import Reservation from "../components/studioInfo/Reservation.vue";
// import Map from "../components/studioInfo/Map.vue";
import ChartGender from "../components/studioInfo/ChartGender.vue";
import StudioList from "@/components/search/StudioList.vue";


Vue.use(VueRouter);
const routes = [{
        path: "/",
        name: "pics-main",
        component: Main
    },
    {
        path: "/studioSearch/:categoryId",
        name: "studioSearch",
        component: StudioSearch,
        props: true
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
        path: "/companyRegister",
        name: "companyRegister",
        component: CompanyRegister
    },
    {
        path: "/customerregister",
        name: "customerregister",
        component: CustomerRegister
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
    }, {
        path: "/companyedit",
        name: "companyedit",
        component: CompanyEdit
    }, {
        path: "/customeredit",
        name: "customeredit",
        component: CustomerEdit
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