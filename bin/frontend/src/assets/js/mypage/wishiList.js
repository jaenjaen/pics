import axios from "axios";

export default {
    name: 'wishList',
    data() {
        return {
            custId: this.$route.params.custId,
            studios: [],
            //bookmark 변수
            deleteResponse: ''
        }
    },
    mounted() {

        axios
            .get("http://54.180.25.91:7777/bookmarklist/" + this.custId)
            .then(response => (this.studios = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));



    },
    methods: {
        getImgUrl(url) {
            return require("@/assets/img/studio/" + url);
        },
        removeBookmark(bookId) {
            axios
                .delete("http://54.180.25.91:7777/bookmark/" + bookId)
                .then(response => (this.deleteResponse = response.data))
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            console.log("북마크 삭제 완료")
            location.reload();

        },
        ToInfo(stuId) {
            this.$router.push("/studioInfo/" + stuId);
        }

    },
    filters: {
        city(value) {
            let str = value.split("시");
            return str[0];
        },
        category(value) {
            let name = value;
            let place = '';
            if (name == 1) {
                place = '스튜디오'
            } else if (name == 2) {
                place = '카페'
            } else if (name == 3) {
                place = '집'
            } else if (name == 4) {
                place = '사무실'
            } else if (name == 5) {
                place = '식당'
            } else if (name == 6) {
                place = '루프탑'
            } else if (name == 7) {
                place = '펍'
            } else if (name == 8) {
                place = '학교'
            } else if (name == 9) {
                place = '기타'
            }
            return place;
        },
        currency: function(value) {
            let num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        },
        //평점에 0.0 식으로 표시하는 필터
        demical: function(value) {
            let num = new Number(value);
            if (num == 0) return 0;
            return num.toFixed(1);
        },
        forSpace(value) {
            let forSpace = value.replaceAll("_", " ").split(" ");
            if (forSpace[1] == null) {
                forSpace[1] = ""
            }
            forSpace = forSpace[0] + " " + forSpace[1];

            return forSpace
        }
    },
    computed: {
        wWidth() {
            let wWidth = window.innerWidth;
            if (wWidth < 768) {
                return wWidth + 'px'

            }
        },
        imgWidth() {
            let wWidth = window.innerWidth;
            if (wWidth < 768) {
                return 300 + 'px'
            }
        },
        imgHeight() {
            let wWidth = window.innerWidth;
            if (wWidth < 768) {
                return 250 + 'px'
            }
        }
    }
}