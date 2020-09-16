import axios from "axios"; //axios


export default {
    name: "OtherStudio",
    data() {
        return {
            stuId: 0,

        }

    },
    props: ["stuIdData"],
    components: {

    },
    created: function() {
        console.log("props로 데이터 받음~~!!");
        this.stuId = this.stuIdData;
    },
    methods: {

    },
    mounted() {
        axios
            .post("http://127.0.0.1:5000/target/" + this.stuId)
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));

        axios
            .get("http://127.0.0.1:5000/similar/")
            .then(response => {
                this.customer = response.data;
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },

}