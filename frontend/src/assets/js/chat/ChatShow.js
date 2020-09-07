import Chat from "@/components/chat/Chat.vue";
export default {
    components: { Chat },
    methods: {
        showChatMoal: function() {
            let chatModal = document.getElementById('chatModal');
            chatModal.setAttribute('style', 'display:block;');
        },
        hideChatModal: function() {
            document.getElementById('chatModal').setAttribute('style', 'display:none;');
        }
    },
}