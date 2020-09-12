import Chat from "@/components/chat/Chat.vue";

var customer = JSON.parse(sessionStorage.getItem("customer")); //개인고객
var company = JSON.parse(sessionStorage.getItem("company")); //기업고객

export default {
    components: { Chat },
    created() {
        if (customer === null && company === null) {
            alert("로그인한 회원만 이용 가능합니다.");
            location.href = "/customerLogin"
        }
    },
    mounted() {
        this.$refs.chat.controlModal('show', 'chatListModal');
    },
    methods: {
        goBackToMyPage: function() {
            location.href = "/mypage"
        }

    },
}