/* eslint-disable no-console */
export default {
    name: 'Login',
    data: function() {
        return {
            form:{
                name:"",
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