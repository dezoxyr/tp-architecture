/* eslint-disable no-console */
export default {
    name: "Home",
    data: function() {
        return {
            flights: [],
            userbooked: []
        };
    },
    computed: {},
    methods: {
        updateTheme(value) {
            this.$store.commit("updateTheme", value);
        },
        bookFlight(value) {
            let config = {
                headers: {
                    "Authorization": `Bearer ${this.$session.get("Token")}`,
                    "Content-Type": "application/json",
                },
            };
            this.$axios
                .post("/flight-ticket/" + value, {}, config)
                .then((response) => {
                    console.log(response);
                    console.log("flight number" + value + " is booked");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted: function() {
        this.$session.start()
        this.$axios
            .get("/flight-ticket/")
            .then((response) => {
                this.flights = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        this.$axios({
            method:'get',
            url: '/flight-ticket/my-reservations',
            params: {},
            headers: {
                "Authorization": "Bearer " + this.$session.get("Token"),
                "Content-Type": "application/json" 
            }
        }).then((response)=>{
            console.log(response.data)
            this.userbooked = response.data
        }).catch((error)=>{
            console.log(error)
        })
    },
    components: {},
};
