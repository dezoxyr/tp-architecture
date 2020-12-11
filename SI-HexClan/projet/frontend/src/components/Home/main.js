/* eslint-disable no-console */
export default {
    name: "Home",
    data: function() {
        return {
            flights: [],
            userbooked: [],
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
                .patch("/flight-ticket/" + value + "/book", {}, config)
                .then(() => {
                    this.flights = this.flights.filter((e) => e.id !== value);
                    this.$toast.open({
                        message: "Booked successfully",
                        type: "success",
                        position: "bottom-right",
                    });
                })
                .catch((error) => {
                    this.$toast.open({
                        message: error.response.data.message,
                        type: "error",
                        position: "bottom-right",
                    });
                });
        },
    },
    mounted: function() {
        this.$session.start();
        this.$axios
            .get("/flight-ticket/")
            .then((response) => {
                this.flights = response.data;
            })
            .catch((error) => {
                this.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                    position: "bottom-right",
                });
            });

        if (this.$session.get("Token") != undefined) {
            this.$axios({
                method: "get",
                url: "/flight-ticket/my-reservations",
                params: {},
                headers: {
                    "Authorization": "Bearer " + this.$session.get("Token"),
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    this.userbooked = response.data;
                })
                .catch((error) => {
                    this.$toast.open({
                        message: error.response.data.message,
                        type: "error",
                        position: "bottom-right",
                    });

                    // else{
                    //     this.$toast.open({
                    //         message: error.response.data.message,
                    //         type: "error",
                    //         position: "bottom-right",
                    //     });
                    // }
                });
        }
    },
    components: {},
};
