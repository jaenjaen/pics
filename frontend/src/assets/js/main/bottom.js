export default {
    name: 'botton',
    methods: {
        toWishiList() {
            let custId_json = JSON.parse(sessionStorage.getItem("customer"))
            this.$router.push("/wishlist/" + custId_json.custId);
        },
        toHome() {
            this.$router.push("/");
        },
        toMyPage() {
            this.$router.push("/mypage");
        }
    },
    computed: {
        wWidth() {
            let wWidth = window.innerWidth;

            if (wWidth < 768) {
                return wWidth + 'px'

            }
        }
    }
}