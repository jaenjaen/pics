<script>
    var wrapper = document.getElementById("chat-wrapper");
    wrapper.scrollTop = wrapper.scrollHeight;
</script>
<script scoped src="@/assets/js/chat/Chat.js"></script>
<template>
    <div id="app">
        <!-- Header : 채팅하는 대상 -->
        <header>
            <div>닉네임</div>
        </header>

        <!-- 채팅 본문 : 대화 내용 -->
        <div id="chat-wrapper" class='chat-wrapper'>
            <div class='chat-message padding'>
              <div class='chat-message chat-message-recipient'>
                  <img class='chat-image chat-image-default' src='http://www.michaelmammoliti.com/_projects/chat/_media/img/user1.jpg' />
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
                  <img class='chat-image chat-image-default' src='http://www.michaelmammoliti.com/_projects/chat/_media/img/user2.jpg' />
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
                  <img class='chat-image chat-image-default' src='http://www.michaelmammoliti.com/_projects/chat/_media/img/user1.jpg' />

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
                  <img class='chat-image chat-image-default' src='http://www.michaelmammoliti.com/_projects/chat/_media/img/user2.jpg' />
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
                  <img class='chat-image chat-image-default' src='http://www.michaelmammoliti.com/_projects/chat/_media/img/user2.jpg' />
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
                  <img class='chat-image chat-image-default' src='http://www.michaelmammoliti.com/_projects/chat/_media/img/user2.jpg' />
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
              <a href="javascript:;" @click="showUploadModal">
                <img src="http://localhost:7777/upload/default/add.png" width="30px" height="30px">
              </a>
            </span>
            <span>
                <input type="text" id="word" name="word">
            </span>
            <span>
                <a href="javascript:;" @click="sendMsg">
                  <img src="http://localhost:7777/upload/default/send.png" width="30px" height="30px">
                </a>
            </span>
          </div>
        </footer>

        <!-- Modal : 파일 업로드 -->
        <div id="uploadModal" style="display:none;">
            <div id="uploadContent">
                <div id="closeUpload" @click="hideUploadModal">&times;</div><br/><br/>
                <p style="font-size:18px;">파일 첨부</p>
                <input type="file" id="chatFileUpload" style="display:none;"><br/>
                <input type="text" id="chatFileName" disabled>
                <button id="uploadBtn" onclick="document.getElementById('chatFileUpload').click()">찾기</button>
                <button id="removeBtn">삭제</button><br/>
                <button id="sendBtn">전송</button>
            </div>
        </div>
    </div>
</template>
<style scoped src="@/assets/css/chat/Chat.css"></style>