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
import ReservationList from "../views/mypage/reservation/ReservationList.vue"
import WishList from "../views/mypage/WishList.vue";
import RegisterStudio from "@/components/studioRegister/RegisterStudio.vue";
import StudioEdit from "@/views/mypage/edit/StudioEdit.vue";
import FileRoute from "@/components/studioRegister/FileRoute.vue";
import StudioInfo from "@/components/studioInfo/StudioInfo.vue";
import Reservation from "@/components/studioInfo/Reservation.vue";
import Map from "@/components/studioInfo/Map.vue";
import StudioList from "@/components/search/StudioList.vue";
import UploadImg from "@/components/predict/uploadImg.vue";
import Chat from "@/components/chat/Chat.vue";
import ChatShow from "@/components/chat/ChatShow.vue";
import CompanyInfo from "@/components/company/company_info.vue"
import ChatTest from "@/components/chat/ChatTest.vue";

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
    },
    {
        path: "/fileRoute",
        name: "fileRoute",
        component: FileRoute
    },
    {
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
        path: "/wishlist/:stuid",
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
    },
    {
        path: "/studioList",
        name: "studioList",
        component: StudioList
    },
    {
        path: "/companyedit",
        name: "companyedit",
        component: CompanyEdit
    },
    {
        path: "/customeredit",
        name: "customeredit",
        component: CustomerEdit
    },
    {
        path: "/uploadImg",
        name: "uploadImg",
        component: UploadImg
    },
    {
        path: "/reservationlist",
        name: "reservationlist",
        component: ReservationList
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat
    },
    {
        path: "/chatShow",
        name: "chatShow",
        component: ChatShow
    }, {
        path: "/chatTest",
        name: "chatTest",
        component: ChatTest
    }, {
        path: "/companyInfo/:comId",
        name: "companyInfo",
        component: CompanyInfo
    },
    {
        path: "/Map",
        name: "Map",
        component: Map
    }, {
        path: "/studioEdit/:stuId",
        name: "studioEdit",
        component: StudioEdit
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
export default router;