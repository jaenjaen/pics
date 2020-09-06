<template>
    <div id="app">
        <button @click="showChatMoal">문의</button>
        <div id="chatModal" style="display:none;">
            <div id="chatContent">
                <div id="closeChat" @click="hideChatModal" >&times;</div><br/><br/>
                <Chat id="chatArea" customerMode="true" />
            </div>
        </div>
    </div>
</template>
<script>
import Chat from "@/components/chat/Chat.vue";
export default {
    components: { Chat },
    methods: {
    showChatMoal: function() { 
        let chatModal = document.getElementById('chatModal');
        chatModal.setAttribute('style', 'display:block;');
    },
    hideChatModal: function(){
        document.getElementById('chatModal').setAttribute('style', 'display:none;');
    }
  },
}
</script>
<style scoped>
        /* Modal 전체 */
        #chatModal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 80px;
            padding-bottom: 80px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }
        /* Modal 내용 */
        
        #chatContent {
            background-color: #fefefe;
            margin: auto;
            overflow: auto;
            text-align: left;
            padding: 30px;
            border: 1px solid #888;
            width: 80%;
            height: 100%;
        }
        /* Modal 닫기 버튼 */
        
        #closeChat {
            position: fixed;
            color: #aaaaaa;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 50px;
        }
        
        #closeChat:hover,
        #closeChat:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        #chatArea{
            margin-left:10px;
            padding-bottom:30px;
        }

        /* 반응형 : 너비 500px 이하 */
         @media screen and (max-width: 500px) {
                /* 모달 너비 조정 */
                #chatModal {
                    padding-top: 50px;
                    padding-bottom: 30px;
                }
                #chatContent {
                    width: 100%;
                    padding-left:10px;
                    padding-top:10px;
                    padding-right:0;
                    padding-bottom:0;
                }
            }
</style>