export default {
    name: 'company_info',
    props: ['comId'],
    data() {
        return {
            comId: this.comId
        }
    },
    mounted() {
        alert(comId)
    },
    methods: {
        temp() {
            alert(comId)
        }
    },
}