export default {
    name: 'chat',
    data() {
        return {
            defaultImg: {
                list: 'http://localhost:7777/upload/default/list.png',
                listHover: 'http://localhost:7777/upload/default/listHover.png',
                back: 'http://localhost:7777/upload/default/back.png',
                backHover: 'http://localhost:7777/upload/default/backHover.png',
                user: 'http://localhost:7777/upload/default/user.png',
                add: 'http://localhost:7777/upload/default/add.png',
                send: 'http://localhost:7777/upload/default/send.png'
            }
        }
    },
    methods: {
        /* 채팅 목록 이미지, 뒤로 가기 이미지 hover 이벤트 */
        controlListImg(cmd, obj) {
            if (cmd == 'mouseover') {
                switch (obj) {
                    case 'list':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.listHover);
                        break;
                    case 'back':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.backHover);
                        break;
                }

            } else if (cmd == 'mouseout') {
                switch (obj) {
                    case 'list':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.list);
                        break;
                    case 'back':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.back);
                        break;
                }
            }
        },

        /* Modal 보이기&숨기기 */
        controlModal(cmd, obj) {
            if (cmd == 'show') {
                document.getElementById(obj).setAttribute('style', 'display:block;');
                if (obj == 'chatListModal') {
                    document.getElementById('chatListHeader').setAttribute('style', 'display:block;');
                    document.getElementById('chatHeader').setAttribute('style', 'display:none;');
                }
            } else if (cmd == 'hide') {
                document.getElementById(obj).setAttribute('style', 'display:none;');
                if (obj == 'chatListModal') {
                    document.getElementById('chatHeader').setAttribute('style', 'display:block;');
                    document.getElementById('chatListHeader').setAttribute('style', 'display:none;');
                }
            }
        },

        sendMsg() {
            alert("메세지전송");
        }
    },
}