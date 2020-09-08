export default {
    name: 'company_info',
    props: ['comId'],
    data() {
        return {
            comId: this.comId
        }
    },
    mounted() {
        alert(this.comId)
    },
    methods: {
        temp() {
            alert(this.comId)
        }
    },
}