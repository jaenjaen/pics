import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";
import Inquiry from "@/components/mypage/Inquiry.vue";

var session = JSON.parse(sessionStorage.getItem("customer"));
export default {
    name: "customerMypage",
    components: {
        MypageNametag,
        MypageGap,
        Inquiry
    },
    data() {
        return {
            resvList: [],
            resvFlag: true,
            reviewList: [],
            rvFlag: true,
            custId: session.custId,
            resId: ""
        };
    },
    mounted() {
        axios
            .get("http://localhost:7777/customer/reservation/will/" + this.custId)
            .then(res => {
                this.resvList = res.data;
                this.resvFlag = false;

            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get("http://localhost:7777/review/" + this.custId)
            .then(res => {
                this.reviewList = res.data;
                console.log(this.reviewList);
                if (this.reviewList.length != 0) {
                    this.rvFlag = false;
                }

            }).catch(err => {
                console.log(err);
            })

    },
    methods: {
        deleteResv: function(resId) {
            axios.delete("http://localhost:7777/studio/reservation/" + resId)
                .then(res => {
                    if (res != null) {
                        alert("예약이 취소되었습니다.");
                        location.reload()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deleteReview: function(reviewId) {
            axios.delete("http://localhost:7777/review/" + reviewId)
                .then(res => {
                    if (res.data != null) {
                        alert("리뷰가 삭제되었습니다.");
                        location.reload()
                    } else {
                        alert("다시 시도해주세요.");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
};