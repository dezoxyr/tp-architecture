/* eslint-disable no-console */
export default {
    name: "Home",
    data: function() {
        return {
            flights: [],
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
            console.log(this.$session.get("Token"));
            this.$axios
                .post("/flight-ticket/" + value, _, config)
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
        this.$axios
            .get("/flight-ticket/")
            .then((response) => {
                // console.log(response)
                this.flights = response.data;
                console.log(this.flights);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    components: {},
};
