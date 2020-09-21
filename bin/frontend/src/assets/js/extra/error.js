export default {
    computed: {
        windowHeight() {
            let wHeight = window.innerHeight - 100;
            return wHeight + 'px'
        },
        imgUrl() {
            let wWidth = window.innerWidth;
            if (wWidth > 1000) {
                return require("@/assets/img/util/error1.png")
            } else {
                return require("@/assets/img/util/error.png")
            }
        }
    },
};