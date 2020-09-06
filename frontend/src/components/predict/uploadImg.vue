<template>
    <div>
        <input type="file" accept="image/*" @change="uploadImg($event)">
        <br>
        {{predicted}}
        <br>
        reco : {{recommanded}}
    </div>
</template>

<script scoped>
import axios from "axios";
export default {
    name: "uploadImg",
    data () {
        return {
            predicted:"",
            recommanded: ""
        }
    },
    mounted() {
        this.getReco()
    },
    methods : {
        uploadImg($event) {
            let image = $event.target.files[0];
            let formData = new FormData();
            formData.append("image", image);
            axios
                .post('http://127.0.0.1:5000/predict',formData)
                .then((response) => {
                    this.predicted = response.data;
                })
                .catch(() => {
                    console.log('실패');
                })
                .finally(() => {
                    
                });
        },
        getReco() {
            axios
                .get('http://127.0.0.1:5000/recommand')
                .then((response) => {
                    this.recommanded = response.data;
                })
                .catch(() => {
                    console.log('실패');
                })
                .finally(() => {
                    
                });
        }
    }
}
</script>