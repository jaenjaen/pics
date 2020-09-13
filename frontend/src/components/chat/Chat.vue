<script scoped src="@/assets/js/chat/Chat.js"></script>
<template>
    <div id="app">
        <!-- Header : 채팅하는 대상 -->
        <header>
            <div id="chatHeader">
                <a href="javascript:;" @click="controlModal('show', 'chatListModal')">
                    <img id="list" :src='defaultImg.list' @mouseover="controlListImg('mouseover', 'list')" @mouseout="controlListImg('mouseout', 'list')">
                </a>
                <span id="otherNickname">{{chat.stuId}}</span>
                <img id="otherProfile" class="profile" :src="defaultImg.user">
            </div>
            <div id="chatListHeader">
                <a href="javascript:;" @click="controlModal('hide', 'chatListModal')">
                    <img id="back" :src="defaultImg.back" @mouseover="controlListImg('mouseover', 'back')" @mouseout="controlListImg('mouseout', 'back')">
                </a>
                <span id="myNickname">내 닉네임</span>
                <img id="myProfile" class="profile" :src="defaultImg.user">
            </div>
        </header>

        <!-- 채팅 본문 : 대화 내용 -->
        <div id="chat-wrapper" class='chat-wrapper'>
            <div class='chat-message padding'>
              <div class='chat-message chat-message-recipient'>
                  <img class='chat-image chat-image-default profile' :src='defaultImg.user' />
                  <div class='chat-message-wrapper'>
                  <div class='chat-message-content'>
                      <p>Sushi tonight?</p>
                  </div>
                  <div class='chat-details'>
                      <span class='chat-message-localization font-size-small'>My Address</span>
                      <span class='chat-message-read-status font-size-small'>- Read</span>
                  </div>
                  </div>
              </div>
              <div class='chat-message chat-message-sender'>
                  <img class='chat-image chat-image-default profile' :src='defaultImg.user' />
                  <div class='chat-message-wrapper'>
                  <div class='chat-message-content'>
                      <p>Pizza?</p>
                      <p>We had sushi last time!</p>
                      <p>For me one Vegetariana! Plus some chili oil on it!</p>
                  </div>
                  <div class='chat-details'>
                      <span class='chat-message-localisation font-size-small'>My Address</span>
                      <span class='chat-message-read-status font-size-small'>- Read</span>
                  </div>

                  </div>
              </div>
              <div class='chat-message chat-message-recipient'>
                  <img class='chat-image chat-image-default profile' :src='defaultImg.user' />

                  <div class='chat-message-wrapper'>
                  <div class='chat-message-content'>
                      <p>Done. Delivery takes 5 minutes!</p>
                  </div>
                  <div class='chat-details'>
                      <span class='chat-message-localisation font-size-small'>My Address</span>
                      <span class='chat-message-read-status font-size-small'>- Read</span>
                  </div>
                  </div>
              </div>
              <div class='chat-message chat-message-sender'>
                  <img class='chat-image chat-image-default profile' :src='defaultImg.user' />
                  <div class='chat-message-wrapper'>
                  <div class='chat-message-content'>
                      <p>Awesome! See you later! : )</p>
                  </div>
                  <div class='chat-details'>
                      <span class='chat-message-localization font-size-small'>My Address</span>
                      <span class='chat-message-read-status font-size-small'>- Read</span>
                  </div>
                  </div>
              </div>
              <div class='chat-message chat-message-sender'>
                  <img class='chat-image chat-image-default profile' :src='defaultImg.user' />
                  <div class='chat-message-wrapper'>
                  <div class='chat-message-content'>
                      <p>Awesome! See you later! : )</p>
                  </div>
                  <div class='chat-details'>
                      <span class='chat-message-localization font-size-small'>My Address</span>
                      <span class='chat-message-read-status font-size-small'>- Read</span>
                  </div>
                  </div>
              </div>
              <div class='chat-message chat-message-sender'>
                  <img class='chat-image chat-image-default profile' :src='defaultImg.user' />
                  <div class='chat-message-wrapper'>
                  <div class='chat-message-content'>
                      <p>Awesome! See you later! : )</p>
                  </div>
                  <div class='chat-details'>
                      <span class='chat-message-localization font-size-small'>My Address</span>
                      <span class='chat-message-read-status font-size-small'>- Read</span>
                  </div>
                  </div>
              </div>
            </div>
        </div>

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

        <!-- Modal : 채팅 목록 -->
        <section id="chatListModal">
            <div id="studioList">
                <select id="studioSelect">
                    <option>전체</option>
                    <option>스튜디오1</option>
                    <option>스튜디오2</option>
                    <option>스튜디오3</option>
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
                <p>
                    <img class="profile" src="http://localhost:7777/upload/default/user.png" @click="showBiggerImg($event)">
                    <span id="userName" @click="getChatByUser($event)">리스트1</span>
                </p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
                <p><img class="profile" :src="defaultImg.user"><span>리스트1</span></p>
            </div>
        </section>

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
    </div>
</template>
<style scoped src="@/assets/css/chat/Chat.css"></style>