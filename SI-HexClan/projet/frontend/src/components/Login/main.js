/* eslint-disable no-console */

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
            let obj = this
            evt.preventDefault()
            this.$axios.post('/user/login',  this.form)
            .then(function (response) {
                if (response.status === 200 && 'token' in response.data ) {
                    obj.$session.start()
                    var token = response.data['token']
                    obj.$session.set('Token', token)
                    obj.$store.commit('updateLoggedState', false)
                    obj.$refs.modal_success.show()
                    setTimeout(function(){ obj.$router.push({ name: "Home" }); }, 2000);
                }
            })
            .catch((error) => {
                if(error.response.status === 400) {
                    console.log("not found")
                    obj.$refs.modal_user_not_found.show()
                } else {
                    console.log("error")
                    obj.$refs.modal_error.show()
                }
                console.log(error);
                if (error.response) {
                    this.$toast.error(error.response.data.message);
                } else {
                    // toast.error(
                    //     "Oops, something went wrong while connecting to server"
                    // );
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