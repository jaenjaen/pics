import Bottom from "@/components/main/Bottom.vue";
export default {
    name: "pics-bottom",
    components: {
        Bottom
    },
    methods: {
        moveToSearch() {
            this.$router.push("/studioSearch/");
        },
        moveBack() {
            this.$router.go(-1);
        }
    }
};