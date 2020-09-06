<template>
    <div id="app">
        <div class='chat-wrapper'>
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
            </div>
            <footer>
                <span>
                    첨부파일
                </span>
                <span>
                    <input type="text" id="word" name="word">
                </span>
                <span>
                    보내기
                </span>
            </footer>
        </div>
    </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300);

* {
  padding: 0;
  margin: 0;
  border: 0;
  color: #888;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 300;
  outline: none;
  box-sizing: border-box;
}
.padding {
  padding: 20px;
}

.clearfix {
  display: table;
  overflow: hidden;
}
.clearfix:before {
  content: " ";
  display: block;
}

.font-size-small {
  font-size: 0.7rem;
}

.chat-wrapper {
  width: 100%;
  display: table;
  overflow: hidden;
}
.chat-wrapper:before {
  content: " ";
  display: block;
}
.chat-wrapper .chat-content {
  background-color: #fff;
}
.chat-wrapper .chat-image {
  float: left;
  border-radius: 50%;
}
.chat-wrapper .chat-image.chat-image-default {
  width: 60px;
  height: 60px;
}
.chat-wrapper .chat-message {
  margin-bottom: 20px;
  width: 100%;
  display: table;
  overflow: hidden;
}
.chat-wrapper .chat-message:before {
  content: " ";
  display: block;
}
.chat-wrapper .chat-message:last-of-type {
  margin-bottom: 0;
}
.chat-wrapper .chat-message .chat-message-wrapper {
  max-width: 70%;
  display: table;
  margin: 0 20px;
  padding-top: 10px;
  position: relative;
}
.chat-wrapper .chat-message .chat-message-wrapper:before {
  content: " ";
  display: block;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  top: 20px;
  position: absolute;
  z-index: 2;
}
.chat-wrapper .chat-message .chat-message-wrapper p {
  padding: 10px 20px;
  color: #fff;
  border-top: 1px solid;
}
.chat-wrapper .chat-message .chat-message-wrapper p:first-of-type {
  border-top: 0 !important;
}
.chat-wrapper .chat-message.chat-message-recipient .chat-message-wrapper,
.chat-wrapper .chat-message.chat-message-recipient .chat-message-content {
  float: left;
}
.chat-wrapper .chat-message.chat-message-recipient .chat-message-wrapper:before {
  left: -20px;
  border-right-color: #91D98A;
}
.chat-wrapper .chat-message.chat-message-recipient p {
  background-color: #91D98A;
  border-top-color: #7dc576;
}
.chat-wrapper .chat-message.chat-message-sender .chat-message-wrapper,
.chat-wrapper .chat-message.chat-message-sender .chat-message-content {
  float: right;
}
.chat-wrapper .chat-message.chat-message-sender .chat-message-wrapper:before {
  right: -20px;
  border-left-color: #8AC0D9;
}
.chat-wrapper .chat-message.chat-message-sender p {
  background: #8AC0D9;
  border-top-color: #76acc5;
}
.chat-wrapper .chat-message.chat-message-sender img {
  float: right;
}
.chat-wrapper .chat-message .chat-message-content {
  display: table;
  overflow: hidden;
  border-radius: 4px;
}
.chat-wrapper .chat-message .chat-message-content:before {
  content: " ";
  display: block;
}
.chat-wrapper .chat-message .chat-details {
  clear: both;
  width: 100%;
  display: table;
  overflow: hidden;
}
.chat-wrapper .chat-message .chat-details:before {
  content: " ";
  display: block;
}
.chat-wrapper .chat-message .chat-details span {
  margin-right: 4px;
  color: #bbb;
}
footer{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 80%;
    height: 250px;
    padding: 15px 0;
    margin: 0 auto;
    text-align: center;
}
/* 반응형 : 너비 500px 이하 */
@media screen and (max-width: 500px) {
    /* 프로필 사진 크기 조정 */
    .chat-wrapper .chat-image.chat-image-default {
        width: 30px;
        height: 30px;
    }
}
</style>
<script>
export default {
    name: 'chat',
}
</script>