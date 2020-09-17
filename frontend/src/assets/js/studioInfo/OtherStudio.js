import axios from "axios";
import carousel from "vue-owl-carousel";

export default {
    name: "OtherStudio",
    data() {
        return {
            stuId: 0,
            studio_infos: [{
                address: "",
                category_name: "",
                name: "",
                stu_id: 0,
                unit_price: 0,
                main_img: ""
            }],
            num: 4,
            mainImg1: "",
        }
    },
    props: ["stuIdData"],
    components: {
        carousel,
    },
    created: function() {
        this.stuId = this.stuIdData;
    },
    async mounted() {
        await axios
            .get("http://127.0.0.1:5000/tag/" + this.stuId)
            .then(response => {
                this.studio_infos = response.data
                for (let j = 0; j < 1; j++) {
                    let mainImgs = (this.studio_infos[j].main_img).split(',');
                    this.studio_infos[j].main_img = mainImgs[0];
                    console.log("this.studio_infos: " + this.studio_infos)
                }
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
    methods: {
        imgUrl(imgName) {
            return require("@/assets/img/studio/" + imgName);
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
            return num.toFixed(0).toLocaleString();
        },
        category: function(value) {
            let str = value.split("시");
            return str[0];
        },
        substring: function(value) {
            if (value.length > 12) {
                return value.substring(0, 9) + "...";
            }
            return value;

        }
    }

}