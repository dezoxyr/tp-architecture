/* eslint-disable no-console */
export default {
    name: 'Root',
    data: function() {
        return {
            themes: [
                {
                    name: "Light",
                    value: "light"
                },
                {
                    name: "Dark",
                    value: "dark"
                }
            ]
        }
    },
    computed: {

    },
    methods: {
        updateTheme(value) {
            this.$store.commit('updateTheme', value)
        }
    },
    mounted:() => {
        
    },
    components: {
        
    }
}