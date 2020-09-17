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
            num: 4
        }
    },
    props: ["stuIdData"],
    components: {
        carousel,
    },
    created: function() {
        this.stuId = this.stuIdData;
        console.log("Props로 데이터 받음~~!! 여긴 OtherStudio : " + this.stuId);
    },
    async mounted() {
        await axios
            .get("http://127.0.0.1:5000/tag/10") // + this.stuId)
            .then(response => {
                this.studio_infos = response.data;
                for (let i = 0; i < (this.studio_infos).length; i++) {
                    let mainImg1 = (this.studios[i].main_img).split(',');
                    console.log("this.studio_infos[i].main_img : " + mainImg1)
                    for (let j = 0; j < 1; i++) {
                        this.studio_infos.main_img = mainImg1[i];
                        console.log("this.studio_infos.main_img : " + this.studio_infos.main_img)
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
        imgUrl(imgName) {
            console.log("imgName : " + imgName)
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
        }
    }

}