// @ is an alias to /src
//import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";
import Inquiry from "@/components/mypage/Inquiry.vue";
import Axios from "axios";

var session = JSON.parse(sessionStorage.getItem("company"));
export default {
    name: "CompanyMypage",
    components: {
        MypageNametag,
        MypageGap,
        Inquiry
    },
    data() {
        return {
            comId: session.comId,
            studioList: [],
            studioFlag: true

        };
    },
    mounted() {
        /* 소유 스튜디오 불러오기 */
        Axios.get("http://localhost:7777/studio/" + this.comId)
            .then(res => {
                console.log(res.data);
                this.studioList = res.data;
                this.studioFlag = false;
            }).catch(err => {
                console.log(err);
            })
    },
    methods: {}
};