import Bottom from "@/components/main/Bottom.vue";
export default {
    name: "pics_header",
    components: {
        Bottom
    },
    methods: {
        moveToSearch(value) {
            this.$router.push("/studioSearch/" + value);
        },
        moveBack() {
            this.$router.go(-1);
        },
        toHome() {
            this.$router.push("/");
        }
    },
    computed: {
        wWidth() {
            let wWidth = window.innerWidth;

            if (wWidth < 768) {
                return wWidth + 'px'

            }
        }
    },
}