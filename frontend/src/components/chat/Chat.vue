<script scoped src="@/assets/js/chat/Chat.js"></script>
<template>
    <div id="chatVue">

        <div>
            <!-- Header : 채팅하는 대상 -->
            <header>
                <div id="chatHeader">
                    <a href="javascript:;" @click="controlModal('show', 'chatListModal')">
                        <img id="list" :src='defaultImg.list' @mouseover="controlListImg('mouseover', 'list')" @mouseout="controlListImg('mouseout', 'list')">
                    </a>
                    <span v-if="customerMode" id="otherNickname">{{presentStu.stuName | showLimitedContent}}</span>
                    <span v-else id="otherNickname">{{presentCust.custName | showLimitedContent}}</span>
                    <img v-if="customerMode" id="otherProfile" class="profile" :src="presentStu.comLogo" @click="showBiggerImg($event)">
                    <img v-else id="otherProfile" class="profile" :src="presentCust.custLogo" @click="showBiggerImg($event)">
                </div>
                <div id="chatListHeader">
                    <a href="javascript:;" @click="controlModal('hide', 'chatListModal')">
                        <img id="back" :src="defaultImg.back" @mouseover="controlListImg('mouseover', 'back')" @mouseout="controlListImg('mouseout', 'back')">
                    </a>
                    <span v-if="customerMode" id="myNickname">{{customer.nickname | showLimitedContent}}</span>
                    <span v-else id="myNickname">{{company.name | showLimitedContent}}</span>
                    <img v-if="customerMode" id="myProfile" class="profile" :src="customer.imgSrc" @click="showBiggerImg($event)">
                    <img v-else id="myProfile" class="profile" :src="company.logoImg" @click="showBiggerImg($event)">
                </div>
            </header>

            <!-- 채팅 본문 : 대화 내용 -->
            <div id="chat-wrapper" class='chat-wrapper'>
                <div class='chat-message padding'>

                    <!-- 이전 채팅 불러오기 -->
                    <div id="prevChatList" v-for="(prev, idx) in prevAllChat" :key="idx">

                        <!-- 고객 이전 채팅 불러오기 -->
                        <!-- 상대방 -->
                        <div class='chat-message chat-message-recipient' v-if="customerMode && prev.sender == 1">
                            <img class='chat-image chat-image-default profile' :src='presentStu.comLogo' @click="showBiggerImg($event)" />
                            <div class='chat-message-wrapper'>
                                <div class='chat-message-content'>
                                    <p class="other" v-if="prev.word != ''">{{prev.word}}</p>
                                    <p v-else-if="isImgFile(prev.filePath)">
                                        <img class="chatUploadImg" :src="chatRoute + prev.filePath">
                                    </p>
                                    <p v-else>
                                        <a :href="chatRoute + prev.filePath" download="downloadFile">
                                            {{prev.filePath}}
                                        </a>
                                    </p>
                                </div><!-- chat-message-content -->
                                <div class='chat-details' v-if="checkSameTime(idx)">
                                    <span class='chat-message-localization font-size-small cust-time'>{{prev.dateTime | showUntilMin}}</span>
                                </div><!-- chat-details -->
                            </div><!-- chat-message-wrapper -->
                        </div><!-- chat-message-recipient -->
                        <!-- 나 -->
                        <div class='chat-message chat-message-sender' v-if="customerMode && prev.sender == 0">
                            <img class='chat-image chat-image-default profile' :src='customer.imgSrc' @click="showBiggerImg($event)" />
                            <div class='chat-message-wrapper'>
                                <div class='chat-message-content'>
                                    <p v-if="prev.word != ''">{{prev.word}}</p>
                                    <p v-else-if="isImgFile(prev.filePath)">
                                        <img class="chatUploadImg" :src="chatRoute + prev.filePath">
                                    </p>
                                    <p v-else>
                                        <a :href="chatRoute + prev.filePath" download="downloadFile">{{prev.filePath}}</a>
                                    </p>
                                </div><!-- chat-message-content -->
                                <div class='chat-details' v-if="checkSameTime(idx)">
                                    <span class='chat-message-read-status font-size-small' v-if="prev.readCheck == 1">읽음</span>
                                    <span class='chat-message-localisation font-size-small  cust-time'>{{prev.dateTime | showUntilMin}}</span>
                                    <span class="delChatBtn" @click="deleteChat(prev.filePath, prev.chatId)">삭제</span>
                                </div><!-- chat-details -->
                            </div><!-- chat-message-wrapper -->
                        </div><!-- chat-message-sender -->


                        <!-- 기업 이전 채팅 불러오기 -->
                        <!-- 상대방 -->
                        <div class='chat-message chat-message-recipient'  v-if="!customerMode && prev.sender == 0">
                            <img class='chat-image chat-image-default profile' :src='presentCust.custLogo' @click="showBiggerImg($event)" />
                            <div class='chat-message-wrapper'>
                                <div class='chat-message-content'>
                                    <p class="other" v-if="prev.word != ''">{{prev.word}}</p>
                                    <p v-else-if="isImgFile(prev.filePath)">
                                        <img class="chatUploadImg" :src="chatRoute + prev.filePath">
                                    </p>
                                    <p v-else>
                                        <a :href="chatRoute + prev.filePath" download="downloadFile">
                                            {{prev.filePath}}
                                        </a>
                                    </p>
                                </div><!-- chat-message-content -->
                                <div class='chat-details' v-if="checkSameTime(idx)">
                                    <span class='chat-message-localization font-size-small stu-time'>{{prev.dateTime | showUntilMin}}</span>
                                </div><!-- chat-details -->
                            </div><!-- chat-message-wrapper -->
                        </div><!-- chat-message-recipient -->
                        <!-- 나 -->
                        <div class='chat-message chat-message-sender'  v-if="!customerMode && prev.sender == 1">
                            <img class='chat-image chat-image-default profile' :src='company.logoImg' @click="showBiggerImg($event)" />
                            <div class='chat-message-wrapper'>
                                <div class='chat-message-content'>
                                    <p v-if="prev.word != ''">{{prev.word}}</p>
                                    <p v-else-if="isImgFile(prev.filePath)">
                                        <img class="chatUploadImg" :src="chatRoute + prev.filePath">
                                    </p>
                                    <p v-else>
                                        <a :href="chatRoute + prev.filePath" download="downloadFile">{{prev.filePath}}</a>
                                    </p>
                                </div><!-- chat-message-content -->
                                <div class='chat-details' v-if="checkSameTime(idx)">
                                    <span class='chat-message-read-status font-size-small' v-if="prev.readCheck == 1">읽음</span>
                                    <span class='chat-message-localisation font-size-small  cust-time'>{{prev.dateTime | showUntilMin}}</span>
                                    <span class="delChatBtn" @click="deleteChat(prev.filePath, prev.chatId)">삭제</span>
                                </div><!-- chat-details -->
                            </div><!-- chat-message-wrapper -->
                        </div><!-- chat-message-sender -->

                    </div><!-- prevChatList -->
                </div><!-- padding -->
            </div><!-- chat-wrapper -->

            <!-- Modal : 고객 채팅 목록 -->
            <section id="chatListModal" v-if="customerMode">
                <div id="studioList" style="height:60px;">
                    <div id="studioSearch">
                        <input type="text" id="searchStuName" placeholder="스튜디오 검색" class="inputArea" @keyup="searchRecentChatByName('cust')">
                        <img id="search" :src="defaultImg.search" 
                        width="20px" height="20px" 
                        @mouseover="controlListImg('mouseover', 'search')" 
                        @mouseout="controlListImg('mouseout', 'search')"
                        @click="searchRecentChatByName('cust')">
                    </div>
                </div>
                <div id="chatListContent" style="padding-top:55px;">
                    <table>
                        <tr v-for="(recent, index) in recentChat" :key="'recentCustFirstChat'+index">
                            <td v-if="recent.sender==1 && recent.readCheck==0">
                                <img class="profile" :src="recent.comLogo" @click="showBiggerImg($event)">
                                <span id="userName" @click="getChatByUser($event)">
                                    {{recent.stuName | showLimitedContent}} | {{recent.comName | showLimitedContent}}
                                    <span style="display:none;">{{recent.stuId}}</span>
                                    <span style="display:none;">{{recent.custId}}</span>
                                </span>
                                <span v-for="(unreadChat, index) in CountOfUnreadChat" :key="'custUnreadCount'+index">
                                    <span v-if="unreadChat.stuId == recent.stuId && unreadChat.custId == recent.custId" class="unread">
                                        +{{unreadChat.count}}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr v-for="(recent, index) in recentChat" :key="'recentCustSecondChat'+index">
                            <td v-if="recent.sender!=1 || recent.readCheck!=0">
                                <img class="profile" :src="recent.comLogo" @click="showBiggerImg($event)">
                                <span id="userName" @click="getChatByUser($event)">
                                    {{recent.stuName | showLimitedContent}} | {{recent.comName | showLimitedContent}}
                                    <span style="display:none;">{{recent.stuId}}</span>
                                    <span style="display:none;">{{recent.custId}}</span>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>

            <!-- Modal : 기업 채팅 목록 -->
            <section id="chatListModal" v-else>
                <div id="studioList">
                    <select id="studioSelect" @change="changeStudio($event)">
                        <option>스튜디오 전체</option>
                        <option v-for="(recent, index) in recentChatNoRepeat" :key="index">
                            {{recent.stuName}}
                            <input type="hidden" :value="recent.stuId">
                        </option>
                    </select>
                    <div id="studioSearch">
                        <input type="text" id="searchCustName" placeholder="고객 검색" class="inputArea" @keyup="searchRecentChatByName('com')">
                        <img id="search" :src="defaultImg.search" 
                        width="20px" height="20px" 
                        @mouseover="controlListImg('mouseover', 'search')" 
                        @mouseout="controlListImg('mouseout', 'search')"
                        @click="searchRecentChatByName('com')">
                    </div>
                </div>
                <div id="chatListContent">
                    <table>
                        <tr v-for="(recent, index) in recentChat" :key="'recentComFirstChat'+index">
                            <td v-if="recent.sender==0 && recent.readCheck==0">
                                <img class="profile" :src="recent.custLogo" @click="showBiggerImg($event)">
                                <span id="userName" @click="getChatByUser($event)">
                                    {{recent.custName | showLimitedContent}} | {{recent.stuName | showLimitedContent}}
                                    <span style="display:none;">{{recent.stuId}}</span>
                                    <span style="display:none;">{{recent.custId}}</span>
                                </span>
                                <span v-for="(unreadChat, index) in CountOfUnreadChat" :key="'comUnreadCount'+index">
                                    <span v-if="unreadChat.stuId == recent.stuId && unreadChat.custId == recent.custId" class="unread">
                                        +{{unreadChat.count}}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr v-for="(recent, index) in recentChat" :key="'recentComSecondChat'+index">
                            <td v-if="recent.sender!=0 || recent.readCheck!=0">
                                <img class="profile" :src="recent.custLogo" @click="showBiggerImg($event)">
                                <span id="userName" @click="getChatByUser($event)">
                                    {{recent.custName | showLimitedContent}} | {{recent.stuName | showLimitedContent}}
                                    <span style="display:none;">{{recent.stuId}}</span>
                                    <span style="display:none;">{{recent.custId}}</span>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    
        <!-- Modal : 파일 업로드 -->
        <section id="uploadModal">
            <div id="uploadContent">
                <div id="closeUpload" @click="controlModal('hide', 'uploadModal')">&times;</div><br/><br/>
                <p style="font-size:18px;">파일 첨부</p>
                <input type="file" id="chatFile" style="display:none;" @change="setFile($event)"><br/>
                <input type="text" v-model="chat.filePath" id="chatFileName" class="inputArea" disabled>
                <button id="uploadBtn" class="btn" onclick="document.getElementById('chatFile').click()">찾기</button>
                <button id="removeBtn" class="btn" @click="deleteFile()">삭제</button><br/>
                <button id="sendBtn" class="btn" @click="sendChat('file')">전송</button>
            </div>
        </section>

        <!-- Modal : 이미지 확대 -->
        <section id="expandImgModal">
            <div id="expandImgContent">
                <div id="closeUpload" @click="controlModal('hide', 'expandImgModal')">&times;</div><br/><br/>
                <div id="biggerContainer">
                    <img id="biggerProfile" src="">
                </div>
            </div>
        </section>

        <!-- Footer : 파일첨부, 메세지, 전송 -->
        <footer>
          <div style="background:white; display:inline-block;">
            <span>
              <a href="javascript:;" @click="controlModal('show', 'uploadModal')">
                <img id="add" :src="defaultImg.add"  @mouseover="controlListImg('mouseover', 'add')" @mouseout="controlListImg('mouseout', 'add')" width="30px" height="30px">
              </a>
            </span>
            <span>
                <input type="text" v-model="chat.word" id="word" class="inputArea" name="word" @keyup.enter="sendChat('word')">
            </span>
            <span>
                <a href="javascript:;" @click="sendChat('word')">
                  <img :src="defaultImg.send" id="send" @mouseover="controlListImg('mouseover', 'send')" @mouseout="controlListImg('mouseout', 'send')" width="30px" height="30px">
                </a>
            </span>
          </div>
        </footer>
    </div>
</template>
<style scoped src="@/assets/css/chat/Chat.css"></style>