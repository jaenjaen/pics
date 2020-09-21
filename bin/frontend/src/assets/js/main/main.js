import MainSecond from "@/components/main/MainSecond.vue";
import MainThird from "@/components/main/mainThird.vue";
export default {
    name: "mainsecond",
    components: {
        MainSecond,
        MainThird
    },
    methods: {
        moveToSearch(value) {
            this.$router.push("/studioSearch/" + value);
        }
    }
};