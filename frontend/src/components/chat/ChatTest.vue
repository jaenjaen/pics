<template>
  <div id="app">
    <a
    :href="url"
    @click.prevent="downloadItem(url)"
    >
    다운로드
    </a>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return{
      url: 'http://54.180.25.91:7777/upload/chat/20200916093823203_1234@admin.com.png'
    }
  },
  methods: {
    downloadItem (url) {
      axios.get(url, { responseType: 'blob' }, )
        .then(({ data }) => {
          let blob = new Blob([data], { type: 'image/png' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'image.png'
          link.click()
        .catch(error => {
          console.error(error)
        })
      })
  }
  }
}
</script>

<!--
<template>
  <div id="app">
    유저이름: 
    <input
      v-model="sender"
      type="text"
    >
    내용: <input
      v-model="word"
      type="text"
      @keyup="sendWord"
    >
    <div
      v-for="(item, idx) in recvList"
      :key="idx"
    >
      <h3>유저이름: {{ item.sender }}</h3>
      <h3>내용: {{ item.word }}</h3>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'App',
  data() {
    return {
      sender: "",
      word: "",
      recvList: []
    }
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect()
  },
  methods: {
    sendWord (e) {
      if(e.keyCode === 13 && this.sender !== '' && this.word !== ''){
        this.send()
        this.word = ''
      }
    },    
    send() {
      console.log("Send word:" + this.word);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          sender: this.sender,
          word: this.word 
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },    
    connect() {
      const serverURL = "http://54.180.25.91:7777/webSocket"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          this.connected = true;
          console.log('소켓 연결 성공', frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/send", res => {
            console.log('구독으로 받은 메시지 입니다.', res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body))
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );        
    }
  }
}
</script>
-->