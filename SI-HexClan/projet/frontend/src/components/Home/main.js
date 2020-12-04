/* eslint-disable no-console */
export default {
    name: 'Home',
    data: function() {
        return {
            flightTickets: []
        }
    },
    computed: {

    },
    methods: {
        updateTheme(value) {
            this.$store.commit('updateTheme', value)
        }
    },
    mounted:() => {
        this.$axios.get("/flight-ticket/").then((response)=>{
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    },
    components: {
        
    }
}