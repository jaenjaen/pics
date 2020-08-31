import axios from 'axios'; //axios
import carousel from 'vue-owl-carousel'; //캐러셀
import 'materialize-css'



export default {
    name: "studio-info",
    components: { carousel },
    data: function() {
        return {
            // studio 관련 변수 (GET)
            studios: {
                categoryId: 0,
                name: "",
                description: "",
                rule: "",
                mainImg: "",
                portImg: "",
                cadImg: "",
                floor: 0,
                studioFilter: {
                    size: 0,
                    options: null,
                    parking: "",
                    unitPrice: 0,
                    defaultCapacity: 0,
                    excharge: 0,
                    address: "",
                    maxCapacity: 0
                },
                company: {
                    comId: 0,
                    name: "",
                    address: "",
                },
            },
            tags: [{
                tagId: 0,
                tagName: ""
            }],

            bookmarkCheck: 0, //북마크 id값 받은 변수

            bookmark: { //북마크 추가할 변수
                bookmarkId: 0,
                studio: {},
                customer: {},
            },
            reviews: [],
            accCustomer: 0,

            // 상태 체크 변수
            loading: true,
            errored: false
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:7777/studio/info/10')
            .then(response => this.studios = response.data)
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/studio/tags/3/10')
            .then(response => (this.tags = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/studio/getBookmark/3/10')
            .then(response => (this.bookmarkCheck = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/studio/reviews/10')
            .then(response => (this.reviews = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/studio/accCustomer/10')
            .then(response => (this.accCustomer = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)

    },
    methods: {
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
        },
        bookmarkChange() {
            if (this.bookmarkCheck != 0) {
                this.bookmarkCheck = 0;
                axios
                    .delete('http://127.0.0.1:7777/bookmark/37')
                    .catch(error => {
                        console.log(error);
                        this.errored = true
                    })
                    .finally(() => this.loading = false)

            } else {
                this.bookmark.bookmarkId = this.bookmarkCheck;
                this.bookmark.studio = this.studio;
                this.bookmark.customer = this.customer;

                axios
                    .post('http://127.0.0.1:7777/bookmark', this.bookmark)
                    .catch(error => {
                        console.log(error);
                        this.errored = true
                    })
                    .finally(() => this.loading = false)
                axios
                    .get('http://127.0.0.1:7777/studio/getBookmark/3/10')
                    .then(response => (this.bookmarkCheck = response.data))
                    .catch(error => {
                        console.log(error);
                        this.errored = true
                    })
                    .finally(() => this.loading = false)


            }

        },
        // kakaoShare() {
        //     Kakao.init('91cbdca7243fe89cb44e5d61a5aaaf44');
        //     Kakao.Link.sendDefault({
        //         objectType: 'feed',
        //         content: {
        //             title: this.title,
        //             link: {
        //                 mobileWebUrl: this.url,
        //                 webUrl: this.url
        //             }
        //         }
        // })
    }
}