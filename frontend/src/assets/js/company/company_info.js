import axios from "axios";

export default {
    name: 'company_info',
    data() {
        return {
            comId: this.$route.params
        }
    },
    mounted() {

        axios
            .get("http://localhost:7777/studio/popular")
            .then(response => (this.studio_infos = response.data))
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },
}