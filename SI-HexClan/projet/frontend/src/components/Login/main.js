/* eslint-disable no-console */
import axios from 'axios'
export default {
    name: 'Login',
    data: function() {
        return {
            form:{
                username:"",
                password:""
            },
            show: true
        }
    },
    computed: {

    },
    methods: {
        onSubmit(evt){
            evt.preventDefault()
            let obj = this
                evt.preventDefault()
                axios.post('/user/login',  this.form)
                .then(function (response) {
                    obj.output = response.data;
                    this.$toast.success("Success")
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
        onReset(evt){
            evt.preventDefault()
            this.form.name=""
            this.form.password=""
        }
    },
    mounted: () => {
        
    },
    components: {
        
    }
}