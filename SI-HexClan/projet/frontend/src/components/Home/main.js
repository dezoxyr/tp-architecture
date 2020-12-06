/* eslint-disable no-console */
export default {
    name: 'Home',
    data: function() {
        return {
            flights: []
        }
    },
    computed: {

    },
    methods: {
        updateTheme(value) {
            this.$store.commit('updateTheme', value)
        },
        logout(){
            this.store.commit('logout')
        }
    },
    mounted: function() {
        this.$axios.get("/flight-ticket/").then((response)=>{
            // console.log(response)
            this.flights = response.data
            console.log(this.flights)
        }).catch((error) => {
            console.log(error)
        })
    },
    components: {
        
    }
}