//import axios from "axios";
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
        }
    },
    methods: {
        /* 문의 영역 시작 */
        showChatMoal: function(member, idVal) {
            if (customer === null && company === null) {
                alert("로그인한 회원만 이용 가능합니다.");
                location.href = "/customerLogin"
            } else {
                if (member === 'stuId') { //개인고객일 경우
                    this.stuId = idVal;
                    this.custId = customer.custId;
                } else if (member === 'custId') { //기업고객일 경우
                    this.custId = idVal;
                    //this.stuId='';
                }
                this.$refs.chat.setChat();
                let chatModal = document.getElementById('chatModal');
                chatModal.setAttribute('style', 'display:block;');
            }
        },
        hideChatModal: function() {
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
        },
        /* 문의 영역 끝 */
    }
}