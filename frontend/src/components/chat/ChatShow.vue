<template>
    <div id="app">

        <!-- Chat Modal을 띄우는 클릭 이벤트 -->
        <button @click="showChatMoal">문의</button>

        <!-- Chat Modal 영역 -->
        <div id="chatModal" style="display:none;">
            <div id="chatContent">
                <div id="closeChat" @click="hideChatModal" >&times;</div>
                <Chat id="chatArea" customerMode="true" />
                
            </div>
        </div>

    </div>
</template>

<!-- Chat Modal 관련 외부 자바스크립트/CSS 영역 -->
<script scoped src="@/assets/js/chat/ChatShow.js" />
<style scoped src="@/assets/css/chat/ChatShow.css" />