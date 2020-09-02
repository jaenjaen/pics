import axios from "axios";
import carousel from "vue-owl-carousel";


export default {
    components: {
        carousel,
    },
    data() {
        return {
            studio_infos: [],
            num: 4
        };
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        let check_width = window.matchMedia("only screen and (max-width: 768px)");
        if (check_width.matches) {
            this.num = 2;
        } else {
            this.num = 4;
        }
        axios
            .get("http://localhost:7777/studio/popular")
            .then(response => (this.studio_infos = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));

    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        // 이미지 경로
        getImgUrl(url) {
            return require("@/assets/img/studio/" + url);
        },
        handleResize(event) {
            if (event) {
                location.reload();
            }
        },
        item_num() {
            let check_width = window.matchMedia("only screen and (max-width: 768px)");
            if (check_width.matches) {
                this.num = 2;
            } else {
                this.num = 4;
            }

        },
    },
    filters: {
        demical: function(value) {
            let num = new Number(value);
            if (num == 0) return 0;
            return num.toFixed(1);
        },
        currency: function(value) {
            let num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        },
        category: function(value) {
            let str = value.split("시");
            return str[0];
        }
    }
};