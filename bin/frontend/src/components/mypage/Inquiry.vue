<template>
    <div class="mypage_card">
        <!-- 고객용 문의 창-->
        <div v-if="customerMode">
            <table v-if="inquiryFlag">
                <tr>
                    <th>스튜디오(업체명)</th> <th>내용</th> <th>날짜</th>
                </tr>
                <tr>
                    <td colspan="3"> 문의내역이 없습니다. </td>
                </tr>
            </table>

            <!-- 최근순으로 고객의 스튜디오별 대화 내역들을 불러옴 -->
            <!-- 안 읽은 대화부터 최근순으로 부름 -->
            <table v-else>
                <tr>
                    <th>스튜디오(업체명)</th> <th>내용</th> <th>날짜</th>
                </tr>
                <tr v-for="(custChat, idx) in recentChat" :key="'custFirstTr'+idx">
                    <td v-if="custChat.sender==1 && custChat.readCheck==0">{{custChat.stuName | showLimitedContent}}({{custChat.comName | showLimitedContent}})</td>
                    <td v-if="custChat.sender==1 && custChat.readCheck==0" @click="showChatModal($event)" class="linkToChatModal">
                        {{custChat.word | handleWord}}
                        <span style="display:none;">{{custChat.stuId}}</span>
                        <span style="display:none;">{{custChat.custId}}</span>
                        <span v-for="(unreadChat, index) in CountOfUnreadChat" :key="'custUnreadCount'+index">
                            <span class="unread" v-if="unreadChat.stuId == custChat.stuId && unreadChat.custId == custChat.custId">
                                +{{unreadChat.count}}
                            </span>
                        </span>
                    </td>
                    <td v-if="custChat.sender==1 && custChat.readCheck==0">{{custChat.dateTime | showOnlyDate}}</td>
                </tr>
                <!-- 읽은 대화를 최근순으로 부름 -->
                <tr v-for="(custChat, idx) in recentChat" :key="'custSecondTr'+idx">
                    <td v-if="custChat.sender!=1 || custChat.readCheck!=0">{{custChat.stuName | showLimitedContent}}({{custChat.comName | showLimitedContent}})</td>
                    <td v-if="custChat.sender!=1 || custChat.readCheck!=0" @click="showChatModal($event)" class="linkToChatModal">
                        {{custChat.word | handleWord}}
                        <span style="display:none;">{{custChat.stuId}}</span>
                        <span style="display:none;">{{custChat.custId}}</span>
                    </td>
                    <td v-if="custChat.sender!=1 || custChat.readCheck!=0">{{custChat.dateTime | showOnlyDate}}</td>
                </tr>
            </table>
        </div>
        
        <!-- 스튜디오용 문의창 -->
        <div v-if="!customerMode"> 
            <table v-if="inquiryFlag">
                <tr>
                    <th>스튜디오</th> <th>문의 고객</th> <th>내용</th> <th>날짜</th>
                </tr>
                <tr>
                    <td colspan="4"> 문의내역이 없습니다. </td>
                </tr>
            </table>

            <!-- 최근순으로 스튜디오의 고객별 대화 내역들을 불러옴 -->
            <!-- 안 읽은 대화부터 최근순으로 부름 -->
            <table v-else>
                <tr>
                    <th>스튜디오</th> <th>문의 고객</th> <th>내용</th> <th>날짜</th>
                </tr>
                <tr v-for="(comChat, idx) in recentChat" :key="'comFirstTr'+idx">
                    <td v-if="comChat.sender==0 && comChat.readCheck==0">{{comChat.stuName | showLimitedContent}}</td>
                    <td v-if="comChat.sender==0 && comChat.readCheck==0">{{comChat.custName | showLimitedContent}}</td> 
                    <td v-if="comChat.sender==0 && comChat.readCheck==0" @click="showChatModal($event)" class="linkToChatModal">
                        {{comChat.word | handleWord}}
                        <span style="display:none;">{{comChat.stuId}}</span>
                        <span style="display:none;">{{comChat.custId}}</span>
                        <span v-for="(unreadChat, index) in CountOfUnreadChat" :key="'comUnreadCount'+index">
                            <span class="unread" v-if="unreadChat.stuId == comChat.stuId && unreadChat.custId == comChat.custId">
                                +{{unreadChat.count}}
                            </span>
                        </span>
                    </td>
                    <td v-if="comChat.sender==0 && comChat.readCheck==0">{{comChat.dateTime | showOnlyDate}}</td>
                </tr>
                <!-- 읽은 대화를 최근순으로 부름 -->
                <tr v-for="(comChat, idx) in recentChat" :key="'comSecondTr'+idx">
                    <td v-if="comChat.sender!=0 || comChat.readCheck!=0">{{comChat.stuName | showLimitedContent}}</td>
                    <td v-if="comChat.sender!=0 || comChat.readCheck!=0">{{comChat.custName | showLimitedContent}}</td> 
                    <td v-if="comChat.sender!=0 || comChat.readCheck!=0" @click="showChatModal($event)" class="linkToChatModal">
                        {{comChat.word | handleWord}}
                        <span style="display:none;">{{comChat.stuId}}</span>
                        <span style="display:none;">{{comChat.custId}}</span>
                    </td>
                    <td v-if="comChat.sender!=0 || comChat.readCheck!=0">{{comChat.dateTime | showOnlyDate}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
<script scoped src="@/assets/js/mypage/Inquiry.js"> </script>

<style>
.unread{
    background: #33A3DC;
    color: white;
    font-weight: bold;
    display: inline-block;
    width: 40px;
    height: 20px;
    font-size: 12px;
    border-radius: 10px;
}
</style>

