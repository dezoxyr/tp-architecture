/* eslint-disable no-console */
import axios from "axios";

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
        onSubmit(evt) {
            console.log("hello");
            evt.preventDefault();
            axios
                .post("http://localhost:8080/api/user/register", this.form)
                .then(() => {
                    this.$toast.success("Registration successful");
                })
                .catch((error) => {
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
