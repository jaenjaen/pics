export default {
    name: 'botton',
    methods: {
        toWishiList() {
            let custId_json = JSON.parse(sessionStorage.getItem("customer"))

            this.$router.push("/wishlist/" + custId_json.custId);
        }
    },
}