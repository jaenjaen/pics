import Chat from "@/components/chat/Chat.vue";

var customer = JSON.parse(sessionStorage.getItem("customer")); //개인고객
var company = JSON.parse(sessionStorage.getItem("company")); //기업고객

export default {
    props: {
        stuId: {
            type: Number,
            default: 20
        },
        loginFlag: {
            type: Boolean,
            default: false
        }
    },
    components: { Chat },
    methods: {
        showChatMoal: function() {
            if (customer === null && company === null) {
                alert("로그인한 회원만 이용 가능합니다.");
                location.href = "/customerLogin"
            } else {
                let chatModal = document.getElementById('chatModal');
                chatModal.setAttribute('style', 'display:block;');
            }

        },
        hideChatModal: function() {
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
        }
    },
}