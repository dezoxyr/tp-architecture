/* eslint-disable no-console */
export default {
    name: "Register",
    data: function() {
        return {
            form: {
                email: "",
                username: "",
                password: "",
            },
        };
    },
    computed: {},
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();
            await this.$axios
                .post("/user/register", this.form)
                .then(() => {
                    this.$toast.success("Registration successful");
                    this.$router.push({ name: "Login" });
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response) {
                        this.$toast.error(error.response.data.message);
                    } else {
                        this.$toast.error(
                            "Oops, something went wrong while connecting to server"
                        );
                    }
                });
        },
        onReset(evt) {
            evt.preventDefault();
            this.form.email = "";
            this.form.username = "";
            this.form.password = "";
        },
    },
    mounted: () => {},
    components: {},
};
