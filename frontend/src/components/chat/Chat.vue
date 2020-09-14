<script scoped src="@/assets/js/chat/Chat.js"></script>
<template>
    <div id="app">

    <!-- 고객 채팅 시작 -->
    <div v-if="cutomerMode">
        <!-- Header : 채팅하는 대상 -->
        <header>
            <div id="chatHeader">
                <a href="javascript:;" @click="controlModal('show', 'chatListModal')">
                    <img id="list" :src='defaultImg.list' @mouseover="controlListImg('mouseover', 'list')" @mouseout="controlListImg('mouseout', 'list')">
                </a>
                <span id="otherNickname">{{presentStu.stuName | showLimitedContent}}</span>
                <img id="otherProfile" class="profile" :src="presentStu.comLogo">
            </div>
            <div id="chatListHeader">
                <a href="javascript:;" @click="controlModal('hide', 'chatListModal')">
                    <img id="back" :src="defaultImg.back" @mouseover="controlListImg('mouseover', 'back')" @mouseout="controlListImg('mouseout', 'back')">
                </a>
                <span id="myNickname">{{customer.nickname | showLimitedContent}}</span>
                <img id="myProfile" class="profile" :src="customer.imgSrc">
            </div>
        </header>

        <!-- 채팅 본문 : 대화 내용 -->
        <div id="chat-wrapper" class='chat-wrapper'>
            <div id="custModeChat" class='chat-message padding'>
                <div id="prevChatList" v-for="(prev, index) in prevAllChat" :key="index">

                    <!-- 상대방 -->
                    <div class='chat-message chat-message-recipient'>
                        <img class='chat-image chat-image-default profile' :src='presentStu.comLogo' />
                        <div class='chat-message-wrapper'>
                            <div class='chat-message-content'>
                                <p>{{prev.word}}</p>
                            </div><!-- chat-message-content -->
                            <div class='chat-details'>
                                <span class='chat-message-localization font-size-small'>{{prev.dateTime | showUntilMin}}</span>
                                <span class='chat-message-read-status font-size-small'>- Read</span>
                            </div><!-- chat-details -->
                        </div><!-- chat-message-wrapper -->
                    </div><!-- chat-message-recipient -->

                    <!-- 나 -->
                    <div class='chat-message chat-message-sender'>
                        <img class='chat-image chat-image-default profile' :src='customer.imgSrc' />
                        <div class='chat-message-wrapper'>
                            <div class='chat-message-content'>
                                <p>{{prev.word}}</p>
                            </div><!-- chat-message-content -->
                            <div class='chat-details'>
                                <span class='chat-message-localisation font-size-small'>{{prev.dateTime | showUntilMin}}</span>
                                <span class='chat-message-read-status font-size-small'>- Read</span>
                            </div><!-- chat-details -->
                        </div><!-- chat-message-wrapper -->
                    </div><!-- chat-message-sender -->

                </div><!-- prevChatList -->
            </div><!-- padding -->
        </div><!-- chat-wrapper -->

        <!-- Modal : 채팅 목록 -->
        <section id="chatListModal">
            <div id="studioList" style="height:60px;">
                <div id="studioSearch">
                    <input type="text" class="inputArea">
                    <img id="search" :src="defaultImg.search" 
                    width="20px" height="20px" 
                    @mouseover="controlListImg('mouseover', 'search')" 
                    @mouseout="controlListImg('mouseout', 'search')"
                    @click="searchUserByName($event)">
                </div>
            </div>
            <div id="chatListContent" style="padding-top:55px;">
                <p v-for="(recent, index) in recentChat" :key="index">
                    <img class="profile" :src="recent.comLogo" @click="showBiggerImg($event)">
                    <span id="userName" @click="getChatByUser($event)">
                        {{recent.stuName | showLimitedContent}} | {{recent.comName | showLimitedContent}}
                        <span style="display:none;">{{recent.stuId}}</span>
                        <span style="display:none;">{{recent.custId}}</span>
                    </span>
                </p>
            </div>
        </section>
    </div>
    <!-- 고객 채팅 끝 -->

    <!-- 기업 채팅 시작 -->
    <div v-else>
        <!-- Header : 채팅하는 대상 -->
        <header>
            <div id="chatHeader">
                <a href="javascript:;" @click="controlModal('show', 'chatListModal')">
                    <img id="list" :src='defaultImg.list' @mouseover="controlListImg('mouseover', 'list')" @mouseout="controlListImg('mouseout', 'list')">
                </a>
                <span id="otherNickname">{{presentCust.custName | showLimitedContent}}</span>
                <img id="otherProfile" class="profile" :src="presentCust.custLogo">
            </div>
            <div id="chatListHeader">
                <a href="javascript:;" @click="controlModal('hide', 'chatListModal')">
                    <img id="back" :src="defaultImg.back" @mouseover="controlListImg('mouseover', 'back')" @mouseout="controlListImg('mouseout', 'back')">
                </a>
                <span id="myNickname">{{company.name | showLimitedContent}}</span>
                <img id="myProfile" class="profile" :src="company.logoImg">
            </div>
        </header>

        <!-- 채팅 본문 : 대화 내용 -->
        <div id="chat-wrapper" class='chat-wrapper'>
            <div id="stuModeChat" class='chat-message padding'>
                <div id="prevChatList" v-for="(prev, index) in prevAllChat" :key="index">

                    <!-- 상대방 -->
                    <div class='chat-message chat-message-recipient'>
                        <img class='chat-image chat-image-default profile' :src='presentCust.custLogo' />
                        <div class='chat-message-wrapper'>
                            <div class='chat-message-content'>
                                <p>{{prev.word}}</p>
                            </div><!-- chat-message-content -->
                            <div class='chat-details'>
                                <span class='chat-message-localization font-size-small'>{{prev.dateTime | showUntilMin}}</span>
                                <span class='chat-message-read-status font-size-small'>- Read</span>
                            </div><!-- chat-details -->
                        </div><!-- chat-message-wrapper -->
                    </div><!-- chat-message-recipient -->

                    <!-- 나 -->
                    <div class='chat-message chat-message-sender'>
                        <img class='chat-image chat-image-default profile' :src='company.logoImg' />
                        <div class='chat-message-wrapper'>
                            <div class='chat-message-content'>
                                <p>{{prev.word}}</p>
                            </div><!-- chat-message-content -->
                            <div class='chat-details'>
                                <span class='chat-message-localisation font-size-small'>{{prev.dateTime | showUntilMin}}</span>
                                <span class='chat-message-read-status font-size-small'>- Read</span>
                            </div><!-- chat-details -->
                        </div><!-- chat-message-wrapper -->
                    </div><!-- chat-message-sender -->

              </div><!-- prevChatList -->
            </div><!-- padding -->
        </div><!-- chat-wrapper -->

        <!-- Modal : 채팅 목록 -->
        <section id="chatListModal">
            <div id="studioList">
                <select id="studioSelect" @change="changeStudio($event)">
                    <option>스튜디오 전체</option>
                    <option v-for="(stuList, index) in company.studioList" :key="index">
                        {{stuList.name}}
                        <input type="hidden" :value="stuList.stuId">
                    </option>
                </select>
                <div id="studioSearch">
                    <input type="text" class="inputArea">
                    <img id="search" :src="defaultImg.search" 
                    width="20px" height="20px" 
                    @mouseover="controlListImg('mouseover', 'search')" 
                    @mouseout="controlListImg('mouseout', 'search')"
                    @click="searchUserByName($event)">
                </div>
            </div>
            <div id="chatListContent">
                <p v-for="(recent, index) in recentChat" :key="index">
                    <img class="profile" src="http://localhost:7777/upload/default/user.png" @click="showBiggerImg($event)">
                    <span id="userName" @click="getChatByUser($event)">
                        {{recent.stuName | showLimitedContent}} | {{recent.custName | showLimitedContent}}
                        <span style="display:none;">{{recent.stuId}}</span>
                        <span style="display:none;">{{recent.custId}}</span>
                    </span>
                </p>
            </div>
        </section>
    </div>
    <!-- 기업 채팅 끝 -->

        <!-- Modal : 파일 업로드 -->
        <section id="uploadModal">
            <div id="uploadContent">
                <div id="closeUpload" @click="controlModal('hide', 'uploadModal')">&times;</div><br/><br/>
                <p style="font-size:18px;">파일 첨부</p>
                <input type="file" id="chatFileUpload" style="display:none;"><br/>
                <input type="text" id="chatFileName" class="inputArea" disabled>
                <button id="uploadBtn" class="btn" onclick="document.getElementById('chatFileUpload').click()">찾기</button>
                <button id="removeBtn" class="btn">삭제</button><br/>
                <button id="sendBtn" class="btn">전송</button>
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
                <img :src="defaultImg.add" width="30px" height="30px">
              </a>
            </span>
            <span>
                <input type="text" id="word" class="inputArea" name="word">
            </span>
            <span>
                <a href="javascript:;" @click="sendMsg">
                  <img :src="defaultImg.send" width="30px" height="30px">
                </a>
            </span>
          </div>
        </footer>
    </div>
</template>
<style scoped src="@/assets/css/chat/Chat.css"></style>