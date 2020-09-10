<template>
    <div id="app">
    </div>
</template>
<script>
export default {
    data(){
        return{
            chat:{
                chatId: '',
                custId: '',
                stuId: '',
                word: '',
                dateTime: '',
                sender: ''
            },
            customer:{
                custId: '',
                nickname: '',
                imgSrc: ''
            },
            company:{
                comId: '',
                name: '',
                logoImg: ''
            }
        }
    }
}
</script>