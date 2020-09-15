<template>
    <div class="mypage_card">
        <!-- 고객용 문의 창-->
        <div v-if="customerMode"> 
        <table>
            <tr>
                <th>스튜디오(업체명)</th> <th>내용</th> <th>날짜</th>
            </tr>
            <tr v-if="inquiryFlag">
                <td colspan="3"> 문의내역이 없습니다. </td>
            </tr>
            <tr v-else v-for="(custChat, index) in recentChat" :key="index">
                <td>{{custChat.stuName | showLimitedContent}}({{custChat.comName | showLimitedContent}})</td>
                <td @click="showChatMoal($event)" class="linkToChatModal">
                    {{custChat.word | handleWord}}
                    <span style="display:none;">{{custChat.stuId}}</span>
                    <span style="display:none;">{{custChat.custId}}</span>
                </td>
                <td>{{custChat.dateTime | showOnlyDate}}</td>
            </tr>
        </table>
        </div>
        
        <!-- 스튜디오용 문의창 -->
        <div v-if="!customerMode"> 
            <table>
            <tr>
                <th>스튜디오</th> <th>문의 고객</th> <th>내용</th> <th>날짜</th>
            </tr>
            <tr tr v-if="inquiryFlag">
                <td colspan="4"> 문의내역이 없습니다. </td>
            </tr>
            <tr v-else v-for="(comChat, index) in recentChat" :key="index">
                <td>{{comChat.stuName | showLimitedContent}}</td>
                <td>{{comChat.custName | showLimitedContent}}</td> 
                <td @click="showChatMoal($event)" class="linkToChatModal">
                    {{comChat.word | handleWord}}
                    <span style="display:none;">{{comChat.stuId}}</span>
                    <span style="display:none;">{{comChat.custId}}</span>
                </td>
                <td>{{comChat.dateTime | showOnlyDate}}</td>
            </tr>
        </table>
        </div>
        <!-- Chat Modal 영역 -->
        <div id="chatModal" style="display:none;">
            <div id="chatContent">
                <div id="closeChat" @click="hideChatModal()" >&times;</div>
                <Chat id="chatArea" 
                :stuIdData="stuId" 
                :custIdData="custId" 
                ref="chat" />
            </div>
        </div>
    </div>
</template>

<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
<style scoped src="@/assets/css/chat/ChatShow.css"></style>
<script scoped src="@/assets/js/mypage/Inquiry.js"> </script>

