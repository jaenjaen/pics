import axios from "axios";
import carousel from "vue-owl-carousel";
export default {
    components: {
        carousel
    },
    data() {
        return {
            studio_infos: []
        };
    },
    mounted() {
        axios
            .get("http://127.0.0.1:7777/studio/search")
            .then(response => (this.studio_infos = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
    methods: {
        // 이미지 경로
        getImgUrl(url) {
            return require("@/assets/img/studio/" + url);
        }
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