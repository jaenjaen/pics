import axios from "axios";
import MypageNametag from "@/components/mypage/MypageNametag.vue";
import MypageGap from "@/components/mypage/MypageGap.vue";
import Inquiry from "@/components/mypage/Inquiry.vue";
import Chat from "@/components/chat/Chat.vue"; //채팅

var session = JSON.parse(sessionStorage.getItem("customer"));
export default {
    name: "customerMypage",
    components: {
        MypageNametag,
        MypageGap,
        Inquiry,
        Chat
    },
    data() {
        return {
            resvList: [],
            resvFlag: true,
            reviewList: [],
            rvFlag: true,
            custId: session.custId,
            resId: "",
            selectedId: ''
        };
    },
    mounted() {
        axios
            .get("http://54.180.25.91:7777/customer/reservation/will/" + this.custId)
            .then(res => {
                this.resvList = res.data;
                this.resvFlag = false;

            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get("http://54.180.25.91:7777/review/" + this.custId)
            .then(res => {
                this.reviewList = res.data;
                // console.log(this.reviewList);
                if (this.reviewList.length != 0) {
                    this.rvFlag = false;
                }

            }).catch(err => {
                console.log(err);
            })

    },
    methods: {
        /* 문의 영역 시작 */
        showCustChatForInquiry(stuId) { //inquiry에서 stuId, custId를 받음.
            this.selectedId = stuId;
            // console.log("부모 stuId : " + this.selectedId);
            this.showChatModal();
        },
        showChatModal: function() {
            if (session === null) {
                alert("로그인한 회원만 이용 가능합니다.");
                location.href = "/customerLogin"
            } else {
                this.$refs.chat.setChatSubscribe('on'); //채팅 구독 여부 on
                this.$modal.hide("detailModal");
                this.$refs.chat.setChat(this.selectedId, this.custId);
                this.$refs.chat.controlModal('hide', 'chatListModal');
                let chatModal = document.getElementById('chatModal');
                chatModal.setAttribute('style', 'display:block;');
                this.moveToScrollBottom();
            }
        },
        hideChatModal: function() {
            this.$refs.chat.setChatSubscribe('off'); //채팅 구독 여부 off
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
            /* 모달 창을 닫으면 수정된 최신 대화 내역을 refresh함 */
            this.$refs.inquiry.getRecentChat();
            this.$refs.inquiry.getCountOfUnreadChat();
        },
        /* 스크롤을 최하단으로 옮김 */
        moveToScrollBottom() {
            setTimeout(function() {
                var length = document.getElementById('chatContent').scrollHeight;
                document.getElementById('chatContent').scrollTop = length;
            }, 100);
        },
        /* 문의 영역 끝 */

        /* 예약 취소 */
        deleteResv: function(resId) {
            axios.delete("http://54.180.25.91:7777/studio/reservation/" + resId)
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

        /* 리뷰 삭제 */
        deleteReview: function(reviewId) {
            axios.delete("http://54.180.25.91:7777/review/" + reviewId)
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