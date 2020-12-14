/* eslint-disable no-console */

export default {
    name: "Login",
    data: function() {
        return {
            form: {
                username: "",
                password: "",
            },
            show: true,
        };
    },
    computed: {},
    methods: {
        onSubmit(evt) {
            let obj = this;
            evt.preventDefault();
            this.$axios
                .post("/user/login", this.form)
                .then(function(response) {
                    obj.$session.start();
                    obj.$session.set("Token", response.data.token);
                    obj.$store.commit("updateLoggedState", false);
                    obj.$toast.open({
                        message: "Sucessfully logged in",
                        type: "success",
                        position: "bottom-right",
                    });
                    setTimeout(function() {
                        obj.$router.push({ name: "Home" });
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        this.$toast.open({
                            message: error.response.data.message,
                            type: "error",
                            position: "bottom-right",
                        });
                    } else {
                        this.$toast.open({
                            message:
                                "Oops, something went wrong while connecting to server",
                            type: "error",
                            position: "bottom-right",
                        });
                    }
                });
        },
        onReset(evt) {
            evt.preventDefault();
            this.form.name = "";
            this.form.password = "";
        },
    },
    mounted: () => {},
    components: {},
};
