import axios from "axios";
import Chat from "@/components/chat/Chat.vue"; //문의

var customer = JSON.parse(sessionStorage.getItem("customer")); //개인고객
var company = JSON.parse(sessionStorage.getItem("company")); //기업고객

export default {
    name: "Inquiry",
    components: { Chat },
    props: {
        customerMode: Boolean
    },
    data() {
        return {
            stuId: '',
            custId: '',
            inquiryFlag: true,
            inquiryList: [],

            /* 최근 대화 */
            recentChat: [],
        }
    },
    mounted() {
        if (customer != null) {
            axios.get('http://127.0.0.1:7777/chat/recent/cust/' + customer.custId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('customer 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                        this.inquiryFlag = false;
                    }
                })
                .catch(() => {
                    console.log('customer 최근 대화 가져오기 실패');
                })
        } else if (company != null) {
            axios.get('http://127.0.0.1:7777/chat/recent/com/' + company.comId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('company 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                        this.inquiryFlag = false;
                    }
                })
                .catch(() => {
                    console.log('company 최근 대화 가져오기 실패');
                })
        }
    },
    filters: {
        /* 스튜디오 이름과 고객 닉네임, 문의 내용 글자수를 15자까지만 화면에 보여줌 */
        showLimitedContent(value) {
            if (value.length > 15) {
                return value.substring(0, 15) + "... ";
            } else {
                return value;
            }

        },
        /* 문의 날짜를 연/월/일로 분할함 */
        showOnlyDate(value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === ' ') {
                    return value.substring(0, i);
                }
            }
        },

        handleWord(value) {
            if (value === '') {
                return '(첨부파일)';
            } else {
                if (value.length > 15) {
                    return value.substring(0, 15) + "... ";
                } else {
                    return value;
                }
            }
        }
    },
    methods: {
        /* 전체 문의 내역 확인 */
        showAllChat() {
            this.$refs.chat.controlModal('show', 'chatListModal');
        },

        /* 문의 영역 Modal 보임 */
        showChatMoal: function(event) {
            if (customer === null && company === null) {
                alert("로그인한 회원만 이용 가능합니다.");
                location.href = "/customerLogin"
            } else {
                this.stuId = event.target.childNodes[1].innerHTML;
                this.custId = event.target.childNodes[2].innerHTML;
                console.log("stuId : " + this.stuId);
                console.log("custId : " + this.custId);
                this.$refs.chat.setChat(this.stuId, this.custId);
                let chatModal = document.getElementById('chatModal');
                chatModal.setAttribute('style', 'display:block;');
                this.moveToScrollBottom();
            }
        },

        /* 문의 영역 Modal 숨김 */
        hideChatModal: function() {
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
            window.location.reload();
        },

        /* 스크롤을 최하단으로 옮김 */
        moveToScrollBottom() {
            setTimeout(function() {
                var length = document.getElementById('chatContent').scrollHeight;
                document.getElementById('chatContent').scrollTop = length;
            }, 100);
        }
    }
}