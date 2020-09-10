// @ is an alias to /src
//import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";
import Inquiry from "@/components/mypage/Inquiry.vue";

export default {
    name: "CompanyMypage",
    components: {
        MypageNametag,
        MypageGap,
        Inquiry
    },
    data() {
        return {
            studioList: [],
            studioFlag: true

        };
    },
    mounted() {

    },
    methods: {}
};