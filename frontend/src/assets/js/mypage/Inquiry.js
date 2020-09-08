//import axios from "axios";

export default {
    name: "Inquiry",
    props: {
        customerMode: Boolean
    },
    data() {
        return {
            inquiryFlag: true,
            inquiryList: [],

        }
    },
}