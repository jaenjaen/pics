export default {
    name: 'chat',
    data() {
        return {

        }
    },
    methods: {
        showUploadModal() {
            let uploadModal = document.getElementById('uploadModal');
            uploadModal.setAttribute('style', 'display:block;');
        },
        hideUploadModal() {
            document.getElementById('uploadModal').setAttribute('style', 'display:none;');
        },
        sendMsg() {
            alert("메세지전송");
        }
    },
}