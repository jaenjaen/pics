import axios from "axios";
import carousel from "vue-owl-carousel";

export default {
    components: {
        carousel,
    },
    data() {
        return {
            studio_infos: [{
                address: "",
                category_name: "",
                name: "",
                stu_id: 0,
                unit_price: 0,
                main_img: ""
            }],
            customer: {},
            canReco: false,
            num: 4
        };
    },
    async mounted() {
        window.addEventListener('resize', this.handleResize);
        let check_width = window.matchMedia("only screen and (max-width: 768px)");
        if (check_width.matches) {
            this.num = 2;
        } else {
            this.num = 4;
        }
        if (sessionStorage.getItem('customer')) {
            this.customer = JSON.parse(sessionStorage.getItem('customer'));
            axios
                .get("http://localhost:5000/recommend/" + this.customer.custId)
                .then(response => {
                    if (response.data.status) {
                        this.studio_infos = response.data.studios;
                        this.canReco = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        }
        if (!this.canReco) {
            axios
                .get("http://localhost:5000/recommend")
                .then(response => {
                    this.studio_infos = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        }
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
        moveToComInfo(value) {
            this.$router.push("/studioInfo/" + value);
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