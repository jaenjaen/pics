<template>
    <div id="app">
        <!-- Chat Modal 영역 -->
        <div id="chatModal" style="display:block;">
            <div id="chatContent">
                <div id="closeChat" @click="goBackToMyPage()" >&times;</div>
                <Chat id="chatArea" ref="chat" @moveScroll="moveToScrollBottom()" />
            </div>
        </div>
    </div>
</template>

<!-- Chat Modal 관련 외부 자바스크립트/CSS 영역 -->
<script scoped src="@/assets/js/chat/ChatShow.js" />
<style scoped src="@/assets/css/chat/ChatShow.css" />