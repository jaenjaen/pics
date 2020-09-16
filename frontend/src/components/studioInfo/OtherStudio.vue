<template>
    <div>
        <!-- <input type="file" accept="image/*" @change="uploadImg($event)">
        <br>
        {{predicted}}
        <br>-->
        reco : {{studio}} 
        <!-- {{studio}} -->
    </div>
</template>

<script scoped>
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
    mounted() {
        axios
            .get("http://127.0.0.1:5000/tag/10")
            .then(response => {
                this.studio = response.data;
                // console.log(this.studio)
                console.log("Here~!")
                
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    },

}
</script>