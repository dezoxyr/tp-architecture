/* eslint-disable no-console */
export default {
    name: "Reservation",
    data: function() {
        return {
            userbooked: []
        };
    },
    computed: {},
    methods: {
        updateTheme(value) {
            this.$store.commit("updateTheme", value);
        },
        unBookFlight(value) {
            let config = {
                headers: {
                    "Authorization": `Bearer ${this.$session.get("Token")}`,
                    "Content-Type": "application/json",
                },
            };
            this.$axios
                .patch("/flight-ticket/" + value + "/cancel", {}, config)
                .then(() => {
                    this.userbooked = this.userbooked.filter((e) => e.id !== value);
                    this.$toast.open({
                        message: "Unbooked successfully",
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
        if (this.$session.get("Token") !== undefined) {
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
                });
        }
    },
    components: {},
};
