<template>
    <div id="app">
        <button @click="showChatMoal">문의</button>
        <div id="chatModal" style="display:none;">
            <div id="chatContent">
                <div id="closeChat" @click="hideChatModal" >&times;</div>
                <Chat id="chatArea" customerMode="true" />
                
            </div>
        </div>
    </div>
</template>
<script scoped src="@/assets/js/chat/ChatShow.js" />
<style scoped src="@/assets/css/chat/ChatShow.css" />