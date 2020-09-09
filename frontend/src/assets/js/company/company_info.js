import axios from "axios";

export default {
    name: 'company_info',
    data() {
        return {
            comId: this.$route.params.comId,
            company: [],
        }
    },
    mounted() {
        axios
            .get("http://localhost:7777/companyifo/" + this.comId)
            .then(response => (this.company = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
    methods: {
        com_imgUrl(url) {
            return require("@/assets/img/company_image/" + url);
        },
    },
}