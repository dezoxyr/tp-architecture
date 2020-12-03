/* eslint-disable no-console */
export default {
    name: 'Register',
    data: function() {
        return {
            form:{
                email:"",
                name:"",
                password:""
            }
        }
    },
    computed: {

    },
    methods: {
        onSubmit(evt){
            evt.preventDefault()
        },
        onReset(evt){
            evt.preventDefault()
            this.form.email=""
            this.form.name=""
            this.form.password=""
        }
    },
    mounted: {
        
    },
    components: {
        
    }
}