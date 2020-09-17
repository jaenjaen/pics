import axios from "axios";
import carousel from "vue-owl-carousel";

export default {
    name: "OtherStudio",
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
            num: 4
        }
    },
    props: ["stuIdData"],
    components: {
        carousel,
    },
    created: function() {
        console.log("props studio 정보 : " + this.stuIdData);
        this.stuId = this.stuIdData;
    },
    mounted() {
        axios
            .get("http://127.0.0.1:5000/tag/" + this.stuId)
            .then(response => {
                this.studio_infos = response.data;
                for (let i = 0; i < Object.keys(this.studio_infos).length; i++) {
                    console.log(this.studio_infos[i].main_img)
                    if (this.studio_infos[i].main_img.match(",")) {
                        let mainImg1 = (this.studios[i].main_img).split(',')[-1];
                        this.studio_infos.main_img = mainImg1;
                    }
                }
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
    methods: {
        // getImgUrl(url) {
        //     return require("@/assets/img/studio/" + url);
        // },
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

}