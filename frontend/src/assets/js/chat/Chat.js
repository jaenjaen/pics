import axios from "axios";
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

/* 로그인 확인을 위한 세션 정의 */
var customer = JSON.parse(sessionStorage.getItem("customer")); //개인고객
var company = JSON.parse(sessionStorage.getItem("company")); //기업고객

export default {
    name: 'chat',
    data() {
        return {
            chatRoute: 'http://localhost:7777/upload/chat/',
            defaultImg: {
                list: 'http://localhost:7777/upload/default/list.png',
                listHover: 'http://localhost:7777/upload/default/listHover.png',
                back: 'http://localhost:7777/upload/default/back.png',
                backHover: 'http://localhost:7777/upload/default/backHover.png',
                search: 'http://localhost:7777/upload/default/search.png',
                searchHover: 'http://localhost:7777/upload/default/searchHover.png',
                user: 'http://localhost:7777/upload/default/user.png',
                add: 'http://localhost:7777/upload/default/add.png',
                addHover: 'http://localhost:7777/upload/default/addHover.png',
                send: 'http://localhost:7777/upload/default/send.png',
                sendHover: 'http://localhost:7777/upload/default/sendHover.png'
            },
            chat: {
                chatId: '',
                custId: '',
                stuId: '',
                word: '',
                filePath: '',
                dateTime: '',
                sender: '', //보내는 사람이 개인이면 0, 기업이면 1
                readCheck: '' //읽었으면 1, 읽지 않았으면 0
            },
            customer: {
                custId: '',
                nickname: '',
                imgSrc: ''
            },
            company: {
                comId: '',
                name: '',
                logoImg: '',
                studioList: []
            },

            /* 최근 대화 */
            recentChat: [],
            recentChatNoRepeat: [],

            /* 이전 대화 내역 */
            prevAllChat: [],

            /* 현재 대화 중인 상대방 */
            presentStu: {},
            presentCust: {},

            /* 고객/기업모드 여부 */
            customerMode: '',
        }
    },

    created() {
        this.connect(); //소켓 연결
        if (customer != null) { //개인고객으로 로그인했을 경우
            this.customerMode = true; //고객모드 ON
            this.customer = customer; //세션에 있는 고객 정보를 customer 데이터에 바인딩
            console.log(this.customer);
            this.chat.custId = this.customer.custId; //세션에서 custId를 chat에 바인딩

            this.getRecentCustChat(); //고객의 최근 수신 대화를 가져옴

        } else if (company != null) { //기업고객으로 로그인했을 경우
            this.customerMode = false; //고객모드 OFF
            this.company = company; //세션에 있는 업체 정보를 company 데이터에 바인딩
            console.log(this.company);

            /* DB에서 해당 company 정보 모두 가져오기(스튜디오 포함) */
            axios.get('http://127.0.0.1:7777/companyifo/' + company.comId)
                .then((response) => {
                    console.log('company 정보 가져오기 성공');
                    this.company = response.data; //company 데이터에 바인딩
                    console.log(this.company);

                    /* 업체의 최근 수신 대화를 가져옴 */
                    this.getRecentComChat();
                    this.getRecentComChatNoRpeat(); //스튜디오 중복 없이 가져옴.
                })
                .catch(() => {
                    console.log('company 정보 가져오기 실패');
                })
        }
    },

    filters: {
        /* 스튜디오 이름과 고객 닉네임, 문의 내용 글자수를 15자까지만 화면에 보여줌 */
        showLimitedContent(value) {
            if (value != undefined && value.length > 15) {
                return value.substring(0, 15) + "... ";
            } else {
                return value;
            }
        },
        /* 문의 날짜를 연/월/일/시/분으로 분할함 */
        showUntilMin(value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === ':' && value[i + 3] === ':') {
                    return value.substring(0, i + 3) + value.substring(i + 6, value.length);
                }
            }
        }
    },

    methods: {
        /* 채팅 접속시 설정 */
        setChat(stuId, custId) {
            /* 스튜디오 아이디와 고객 아이디를 부모 컴포넌트로부터 받아와서 바인딩 */
            this.chat.stuId = stuId; //개인고객, 기업고객이 채팅할 때 필요한 스튜디오 아이디
            this.chat.custId = custId; //기업고객이 채팅할 때 필요한 고객 아이디

            if (customer != null) { //개인고객으로 로그인했을 경우
                this.chat.sender = 0; //보내는 이 : 개인
                this.chat.custId = customer.custId;
                console.log("chat 데이터 세팅 완료(보내는 이 : 고객)");
                console.log(this.chat);

                this.getPresentStu(); //현재 대화 중인 스튜디오 정보 가져오기

            } else if (company != null) { //기업고객으로 로그인했을 경우
                this.chat.sender = 1; //보내는 이 : 기업
                console.log("chat 데이터 세팅 완료(보내는 이 : 기업)");
                console.log(this.chat);

                this.getPresentCust(); //현재 대화 중인 고객 정보 가져오기
            }

            /* 이전 대화 내역 가져오기 */
            this.getPrevAllChat()
        },

        /* 고객의 스튜디오별 최근 수신 대화 */
        getRecentCustChat() {
            axios.get('http://127.0.0.1:7777/chat/recent/cust/' + customer.custId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('customer 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChat = [];
                    }
                })
                .catch(() => {
                    console.log('customer 최근 대화 가져오기 실패');
                })
        },

        /* 고객의 스튜디오별 최근 수신 대화(스튜디오 중복 없음) */
        getRecentComChatNoRpeat() {
            axios.get('http://127.0.0.1:7777/chat/recent/comNoRepeat/' + company.comId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('스튜디오 중복 없이 업체의 최근 대화 가져오기 성공');
                        this.recentChatNoRepeat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChatNoRepeat = [];
                    }
                })
                .catch(() => {
                    console.log('스튜디오 중복 없이 업체의 최근 대화 가져오기 성공');
                })
        },

        /* 업체의 스튜디오 및 고객별 최근 수신 대화 */
        getRecentComChat() {
            axios.get('http://127.0.0.1:7777/chat/recent/com/' + company.comId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('company 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChat = [];
                    }
                })
                .catch(() => {
                    console.log('company 최근 대화 가져오기 실패');
                })
        },

        /* 스튜디오의 고객별 최근 수신 대화 */
        getRecentStuChat(stuId) {
            axios.get('http://127.0.0.1:7777/chat/recent/stu/' + stuId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('studio 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChat = [];
                    }
                })
                .catch(() => {
                    console.log('studio 최근 대화 가져오기 실패');
                })
        },

        /* 스튜디오 이름으로 검색한, 고객의 스튜디오별 최근 수신 대화  */
        getRecentChatByStuName(stuName) {
            axios.get('http://127.0.0.1:7777/chat/recent/cust/' + customer.custId + '/' + stuName)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('스튜디오 이름으로 검색한, 고객의 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChat = [];
                    }
                })
                .catch(() => {
                    console.log('스튜디오 이름으로 검색한, 고객의 최근 대화 가져오기 실패');
                })
        },

        /* 스튜디오 아이디, 고객 이름으로 검색한, 업체의 최근 대화 */
        getRecentChatByStuIdAndCustName(stuId, custName) {
            axios.get('http://127.0.0.1:7777/chat/recent/com/' + company.comId + '/' + stuId + '/' + custName)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('스튜디오 아이디, 고객 이름으로 검색한, 업체의 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChat = [];
                    }
                })
                .catch(() => {
                    console.log('스튜디오 아이디, 고객 이름으로 검색한, 업체의 최근 대화 가져오기  실패');
                })
        },

        /* 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 수신 대화  */
        getRecentChatByCustName(custName) {
            axios.get('http://127.0.0.1:7777/chat/recent/com/' + company.comId + '/' + custName)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('고객 이름으로 검색한, 업체의 최근 대화 가져오기 성공');
                        this.recentChat = response.data;
                        console.log(this.recentChat);
                    } else if (response.data == -1) {
                        this.recentChat = [];
                    }
                })
                .catch(() => {
                    console.log('고객 이름으로 검색한, 업체의 최근 대화 가져오기  실패');
                })
        },

        /* 현재 대화 중인 스튜디오 정보 가져오기 */
        getPresentStu() {
            axios.get('http://127.0.0.1:7777/chat/info/stu/' + this.chat.stuId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('현재 대화 중인 Studio 정보 가져오기 성공');
                        this.presentStu = response.data;
                        console.log(this.presentStu);
                    } else if (response.data != -1) {
                        this.presentStu = {};
                    }
                })
                .catch(() => {
                    console.log('현재 대화 중인 Studio 정보 가져오기 실패');
                })
        },

        /* 현재 대화 중인 고객 정보 가져오기 */
        getPresentCust() {
            axios.get('http://127.0.0.1:7777/chat/info/cust/' + this.chat.custId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('현재 대화 중인 Customer 정보 가져오기 성공');
                        this.presentCust = response.data;
                        console.log(this.presentCust);
                    } else if (response.data == -1) {
                        this.presentCust = {};
                    }
                })
                .catch(() => {
                    console.log('현재 대화 중인 Customer 정보 가져오기 실패');
                })
        },

        /* 이전 대화 내역 가져오기 */
        getPrevAllChat() {
            axios.get('http://127.0.0.1:7777/chat/prev/' + this.chat.stuId + '/' + this.chat.custId)
                .then((response) => {
                    if (response.data != -1) {
                        console.log('이전 대화 가져오기 성공');
                        this.prevAllChat = response.data;
                        console.log(this.prevAllChat);
                    } else if (response.data == -1) {
                        this.prevAllChat = [];
                    }
                })
                .catch(() => {
                    console.log('이전 대화 가져오기 실패');
                })
        },

        /* 대화 삭제 */
        deleteChat(fileName, chatId, event) {
            let result = confirm("삭제하시겠습니까?");
            if (result) {
                if (fileName != '') { //파일일 경우 파일을 먼저 삭제
                    this.deleteChatFile(fileName);
                }
                axios.delete('http://127.0.0.1:7777/chat/delete/' + chatId)
                    .then((response) => {
                        if (response.data == 1) {
                            console.log('대화 삭제 성공');
                            this.getPrevAllChat(); //대화 내역을 다시 불러옴

                            /* 채팅 모달의 스크롤을 최하단으로 내림 */
                            this.$emit('moveScroll');
                        } else if (response.data == -1) {
                            console.log('삭제할 대화가 없음');
                        }
                    })
                    .catch(() => {
                        console.log('대화 삭제 실패');
                    })
            } else { //삭제를 원하지 않을 경우
                return;
            }
        },

        /* 파일 삭제 */
        deleteChatFile(fileName) {
            axios.delete('http://127.0.0.1:7777/filedelte/chat/' + fileName)
                .then((response) => {
                    if (response.data === 'OK') {
                        console.log('파일 삭제 성공');
                    } else if (response.data === 'FAIL') {
                        console.log('삭제할 파일이 없음');
                    }
                })
                .catch(() => {
                    console.log('대화 삭제 실패');
                })
        },

        /* 웹소켓 연결 */
        connect() {
            const serverURL = "http://localhost:7777/webSocket"
            let socket = new SockJS(serverURL);
            this.stompClient = Stomp.over(socket);
            console.log(`소켓 연결 시도... 서버 주소: ${serverURL}`)
            this.stompClient.connect({},
                /* 연결 성공 */
                frame => {
                    this.connected = true;
                    console.log('소켓 연결 성공', frame);

                    /* 서버의 메세지 전송 endpoing를 구독(Pub/Sub 구조) */
                    this.stompClient.subscribe("/send", response => {
                        if (this.chat.stuId == JSON.parse(response.body).stuId &&
                            this.chat.custId == JSON.parse(response.body).custId) { //채팅을 해당자들만 1:1로 확인
                            console.log('구독으로 받은 메시지 : ', response.body);

                            // 받은 데이터를 json으로 파싱 후 리스트에 넣음
                            this.prevAllChat.push(JSON.parse(response.body))

                            /* 채팅 모달의 스크롤을 최하단으로 내림 */
                            this.$emit('moveScroll');
                        }
                    });
                },
                /* 연결 실패 */
                error => {
                    console.log('소켓 연결 실패', error);
                    this.connected = false;
                }
            );
        },

        /* 파일이름 및 경로를 화면에 보임 */
        setFile(event) {
            document.getElementById('chatFileName').value = event.target.value;
        },

        /* 업로드한 파일을 삭제함 */
        deleteFile() {
            if (document.getElementById('chatFile').value == '') {
                alert("삭제할 파일이 없습니다.");
                return;
            } else {
                let result = confirm('첨부파일을 삭제하시겠습니까?');
                if (result) {
                    document.getElementById('chatFile').value = '';
                    document.getElementById('chatFileName').value = '';
                } else {
                    return;
                }
            }
        },

        /* 파일 확장자 체크해서 이미지 파일이면 true 리턴 
         true면 채팅 화면에 이미지를 보여줌 */
        isImgFile(path) {
            if (path === null) {
                return false;
            }
            let imgFormat = ['jpeg', 'jpg', 'gif', 'png', 'svg'];
            let fileForm = path.substring(path.lastIndexOf('.') + 1, path.length).toLowerCase();
            for (let i = 0; i < imgFormat.length; i++) {
                if (imgFormat[i] == fileForm) {
                    return true;
                }
            }
            return false;
        },

        /* 채팅 이미지 업로드 */
        uploadChatImg() {
            /* 파일 용량 체크 */
            let maxSize = 5 * 1024 * 1000; //파일 최대 용량 5MB
            let formData = new FormData();
            let file = document.querySelector('#chatFile');
            formData.append("file", file.files[0]);
            console.log("파일 정보 : " + file.files[0]);
            if (file.files[0].size > maxSize) {
                alert("파일은 5MB 이내로 첨부 가능합니다.");
                return;
            }

            let id = '';
            if (company != null) {
                id = company.comId;
            } else if (customer != null) {
                id = customer.custId;
            }
            axios.post('http://127.0.0.1:7777/fileUpload/chat/' + id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((response) => {
                    console.log('채팅 파일 업로드 응답 성공');
                    console.log('파일명 : ' + response.data);
                    this.chat.filePath = response.data;

                    this.send(); //보냄
                })
                .catch(() => {
                    console.log('채팅 파일 업로드 응답 실패');
                })
        },

        /* 보낼 메시지 처리 */
        sendChat(cmd) {
            if (this.chat.stuId !== '' && this.chat.custId !== '') {
                if (this.chat.word !== '' || document.getElementById('chatFile').value !== '') {
                    if (cmd == 'file') {
                        let result = confirm("파일을 전송하시겠습니까?");
                        if (!result) {
                            return;
                        } else {
                            this.uploadChatImg();
                        }
                    } else if (cmd == 'word') {
                        this.send(); //보냄
                    }
                } else if (cmd == 'word' && this.chat.word == '') {
                    alert("내용을 입력하세요");
                    return;
                } else if (cmd == 'file' && document.getElementById('chatFile').value == '') {
                    alert("파일을 첨부하세요");
                }
            }
        },

        /* 메시지 전송 */
        send() {
            console.log("보내는 메세지:" + this.chat.word);
            console.log("보내는 파일:" + this.chat.filePath);
            if (this.stompClient && this.stompClient.connected) {
                const msg = this.chat;
                this.stompClient.send("/receive", JSON.stringify(msg), {});
                this.controlModal('hide', 'uploadModal');

                /* 보내고 나서 입력 리셋 */
                this.chat.word = '';
                this.chat.filePath = '';
                document.getElementById('chatFile').value = '';
                document.getElementById('chatFileName').value = '';

                /* 채팅 모달의 스크롤을 최하단으로 내림 */
                this.$emit('moveScroll');
            }
        },

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
                    case 'search':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.searchHover);
                        break;
                    case 'add':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.addHover);
                        break;
                    case 'send':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.sendHover);
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
                    case 'search':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.search);
                        break;
                    case 'add':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.add);
                        break;
                    case 'send':
                        document.getElementById(obj).setAttribute('src', this.defaultImg.send);
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

        /* 스튜디오 옵션 변경시 */
        changeStudio(event) {
            let studio = event.target.childNodes;
            if (studio[0].selected) { //전체 선택
                this.getRecentComChat();
            }
            for (let i = 1; i < studio.length; i++) {
                if (studio[i].selected) {
                    let stuId = studio[i].childNodes[1].value;
                    this.getRecentStuChat(stuId);
                }
            }
        },

        /* 이름으로 최근 채팅을 검색함 */
        searchRecentChatByName(member) {
            if (member == 'cust') { //스튜디오 이름으로 검색(고객 모드)
                let stuName = document.getElementById('searchStuName').value;
                this.getRecentChatByStuName(stuName);
            } else if (member == 'com') { //고객 이름으로 검색(업체 모드)
                let studioSelect = document.getElementById('studioSelect');
                let custName = document.getElementById('searchCustName').value;
                for (let i = 0; i < studioSelect.length; i++) {
                    if (studioSelect[i].selected) {
                        if (i == 0) { //스튜디오 전체에서 검색
                            this.getRecentChatByCustName(custName);
                        } else { //해당 스튜디오 안에서 검색
                            let stuId = studioSelect[i].childNodes[1].value;
                            this.getRecentChatByStuIdAndCustName(stuId, custName)
                        }
                    }
                }
            }
        },

        /* 채팅 상대를 클릭하면 채팅을 가져옴 */
        getChatByUser(event) {
            this.chat.stuId = event.target.childNodes[1].innerHTML;
            this.chat.custId = event.target.childNodes[2].innerHTML;
            this.setChat(this.chat.stuId, this.chat.custId);
            this.$emit('moveScroll'); //채팅 모달의 스크롤을 최하단으로 내림
            this.controlModal('hide', 'chatListModal');
        },

        /* 프로필 사진을 클릭하면 Modal로 크게 봄 */
        showBiggerImg(event) {
            let imgSrc = event.target.src;
            document.getElementById('biggerProfile').setAttribute('src', imgSrc);
            this.controlModal('show', 'expandImgModal');
        }
    },
}