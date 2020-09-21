export default {
    name: "mainthird",
    methods: {
        moveToSearch(value) {
            // alert(value)
            this.$router.push("/studioSearch/" + value);
        },
        moveTocompanyinfo(value) {
            // alert(value)
            this.$router.push('wishlist/' + value);
        }
    },
};