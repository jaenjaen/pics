import axios from "axios"; //axios
import carousel from 'vue-owl-carousel'; //캐러셀
import 'materialize-css'
import 'material-design-icons/iconfont/material-icons.css'


export default {
    name: "studio-info",
    components: { carousel },
    // components: { VueperSlides, VueperSlide },zz
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
            reviews: [],
            bookmark_check: 0,
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
            .then(response => (this.bookmark_check = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('http://127.0.0.1:7777/studio/bookmark/3/10')
            .then(response => (this.bookmark_check = response.data))
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
            if (this.bookmark_check == 1) {
                this.bookmark_check = 0;

            } else {
                this.bookmark_check = 1;

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