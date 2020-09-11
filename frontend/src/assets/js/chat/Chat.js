import axios from "axios";
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

/* 로그인 확인을 위한 세션 정의 */
var customer = JSON.parse(sessionStorage.getItem("customer")); //개인고객
var company = JSON.parse(sessionStorage.getItem("company")); //기업고객

export default {
    name: 'chat',
    props: ['stuIdData', 'custIdData'],
    data() {
        return {
            defaultImg: {
                list: 'http://localhost:7777/upload/default/list.png',
                listHover: 'http://localhost:7777/upload/default/listHover.png',
                back: 'http://localhost:7777/upload/default/back.png',
                backHover: 'http://localhost:7777/upload/default/backHover.png',
                search: 'http://localhost:7777/upload/default/search.png',
                searchHover: 'http://localhost:7777/upload/default/searchHover.png',
                user: 'http://localhost:7777/upload/default/user.png',
                add: 'http://localhost:7777/upload/default/add.png',
                send: 'http://localhost:7777/upload/default/send.png'
            },
            sender: "",
            word: "",
            recvList: [],
            chat: {
                chatId: '',
                custId: '',
                stuId: '',
                word: '',
                dateTime: '',
                sender: '' //보내는 사람이 개인이면 0, 기업이면 1
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
            }
        }
    },

    created() {
        /* vue가 생성되면 소켓 연결 시도 */
        this.connect();

        /* 스튜디오 아이디와 고객 아이디를 부모 컴포넌트로부터 받아와서 바인딩 */
        this.setId();
    },

    mounted() {
        if (this.custIdData === undefined && customer != null) { //개인고객으로 로그인했을 경우
            this.chat.sender = 0; //보내는 이 : 개인
            this.chat.custId = customer.custId;
            console.log(this.chat);
            this.customer = customer; //customer 데이터에 바인딩
            console.log(this.customer);

        } else if (this.stuIdData === undefined && company != null) { //기업고객으로 로그인했을 경우
            this.chat.sender = 1; //보내는 이 : 기업
            //this.chat.comId = company.comId;
            console.log(this.chat);
            this.company = company;
            console.log(this.company);

            /* DB에서 해당 company 정보 모두 가져오기(스튜디오 포함) */
            axios.get('http://127.0.0.1:7777/companyifo/' + company.comId)
                .then((response) => {
                    console.log('company 정보 가져오기 성공');
                    this.company = response.data; //company 데이터에 바인딩
                    console.log(this.company);
                })
                .catch(() => {
                    console.log('company 정보 가져오기 실패');
                })
        }

        /* 이전 대화 내역 불러오기 */
        this.getPrevMsg();
    },

    methods: {
        setId() {
            console.log("스튜디오 아이디 및 고객 아이디");
            /* 스튜디오 아이디와 고객 아이디 바인딩 */
            this.chat.stuId = this.stuIdData;
            this.chat.custId = this.custIdData;
            console.log(this.chat.stuId);
            console.log(this.chat.custId);
        },

        /* 이전 대화 내역 */
        getPrevMsg() {
            console.log("이전 메세지 가져오기 메소드 첨부");
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
                        console.log('구독으로 받은 메시지 : ', response.body);

                        // 받은 데이터를 json으로 파싱 후 리스트에 넣음
                        this.recvList.push(JSON.parse(response.body))
                    });
                },
                /* 연결 실패 */
                error => {
                    console.log('소켓 연결 실패', error);
                    this.connected = false;
                }
            );
        },

        /* 보낼 메시지 처리 */
        sendMessage(e) {
            if (e.keyCode === 13 && this.sender !== '' && this.word !== '') {
                //13은 아스키코드 중에서 엔터를 나타냄
                this.send(); //보냄
                this.word = '' //보내고 나서 입력 리셋
            }
        },

        /* 메시지 전송 */
        send() {
            console.log("Send Word:" + this.word);
            if (this.stompClient && this.stompClient.connected) {
                const msg = {
                    sender: this.sender,
                    word: this.word
                };
                this.stompClient.send("/receive", JSON.stringify(msg), {});
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

        /* 이름으로 채팅 상대를 검색함 */
        searchUserByName(event) {
            let nickname = event.target.previousSibling.value;
            alert(nickname);
        },

        /* 채팅 상대를 클릭하면 채팅을 가져옴 */
        getChatByUser(event) {
            let nickname = event.target.innerHTML;
            alert(nickname);
        },
        /* 프로필 사진을 클릭하면 Modal로 크게 봄 */
        showBiggerImg(event) {
            let imgSrc = event.target.src;
            document.getElementById('biggerProfile').setAttribute('src', imgSrc);
            this.controlModal('show', 'expandImgModal');
        },
        sendMsg() {
            alert("메세지전송");
            this.setId();
        }
    },
}