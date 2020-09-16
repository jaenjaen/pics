import axios from "axios"; //axios


export default {
    name: "OtherStudio",
    data() {
        return {
            studio: "",

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
            .post("http://127.0.0.1:5000/target/", this.stuId)
            .then(response => {
                this.studio = response.data;
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));

        // axios
        //     .get("http://127.0.0.1:5000/similar/" + this.studio)
        //     .then(response => {
        //         this.stuImage = response.data;
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.errored = true;
        //     })
        //     .finally(() => (this.loading = false));
    },

}