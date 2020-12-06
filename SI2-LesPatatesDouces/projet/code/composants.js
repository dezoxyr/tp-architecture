var signingIn = {
    data: function () {
        return {
            email: "",
            password: "",
            logged: false
        }
    },
    methods: {
        validate() {
            var email = this.email
            var password = this.password
            fetch("http://localhost:5000/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': email, 'password': password })
            })
                .then(function (response) {
                    return response.json()
                }).then((json) => {
                    this.logged = (json.status == "success")
                    this.$emit("logged", email, this.logged)
                })
        }
    },
    template: `
    <v-form
    lazy-validation
    >
        <v-text-field
        label="E-mail"
        v-model="email"
        required
        ></v-text-field>
        <v-text-field
        label="Mot De Passe"
        v-model="password"
        required
        ></v-text-field>
        <v-row align="center" justify="space-around">
        <v-btn
        color="success"
        class="mr-4"
        @click="validate"
        >
        Connexion
        </v-btn>
        </v-row>

  	</v-form>`
}


var signingUp = {
    data: function () {
        return {
            email: "",
            password: "",
            signedUp: false
        }
    },
    methods: {
        validate() {
            var email = this.email
            var password = this.password
            fetch("http://localhost:5000/sign-up", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": password })
            })
                .then(function (response) {
                    return response.json()
                }).then((json) => {
                    this.signedUp = (json.status == "success")
                    this.$emit("signedup", email, password, this.signedUp)
                })
        },

    },
    template: `
    <v-form
    lazy-validation
    >
        <v-text-field
        label="E-mail"
        v-model="email"
        required
        ></v-text-field>
        <v-text-field
        label="Mot De Passe"
        v-model="password"
        required
        ></v-text-field>
        <v-row align="center" justify="space-around">
        <v-btn
        color="success"
        class="mr-4"
        @click="validate"
        >
        S'inscrire
        </v-btn>
        </v-row>
  	</v-form>`

}

var btnReturn = {
    methods: {
        retour() {
            this.$emit("retour")
        }
    },
    template: `
    <v-btn
        color="error"
        class="mr-4"
        @click="retour"
        >
        Retour
        </v-btn>
    
    `
}

var flightTable = {
    data: function () {
        return {
            vols: [],
            headersVols: [
                { text: 'Ville de Départ', value: 'depart.ville' },
                { text: 'Ville d\'Arrivée', value: 'arrivee.ville' },
                { text: 'Date de Départ', value: 'date_depart' },
                { text: 'Date d\'Arrivée', value: 'date_arrivee' },
                { text: 'Places disponibles', value: 'nombre_billets' },
                { text: 'Action', value: 'action' }
            ]
        }
    },
    methods:{
        seeTickets(item){
            fetch("http://localhost:5000/vol/"+ item.id)
            .then(function(response){
                return response.json()
            }).then((json) =>
                console.log(json)
            )
        }
    },
    mounted: function () {
        fetch("http://localhost:5000/vol/all")
            .then(function (response) {
                return response.json()
            }).then((json) =>
                {
                    this.vols = json
                    for(let i =0; i<this.vols.length; ++i){
                        this.vols[i].action = `` //To instantiate action
                    }
                }
            )
    },
    template: `
    <div>
        <v-data-table :headers="headersVols" :items="vols">
        <template v-slot:item.action="{ item }">
        <v-btn @click="seeTickets(item)">Voir les billets disponibles</v-btn>
        </template>
        </v-data-table>
    </div>
    `
}