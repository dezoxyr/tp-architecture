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
        type="password"
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
        type="password"
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
    props: ['flag'],
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
            ],
            id: 0
        }
    },
    methods:{
        seeTickets(item){
            this.id = item.id

            this.$emit("tickets", this.id)
        },
        fetchAll(){
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
        }
    },
    mounted: function () {
        this.fetchAll()
    },
    watch: {
        flag: function(){
            this.fetchAll()
        }
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

var ticketsTable = {
    props:['vol', 'user'],
    data: function () {
        return {
            billets: [],
            headersBillets: [
                { text: 'Code aéroport départ', value: 'codeDepart' },
                { text: 'Code aéroport d\'arrivée', value: 'codeArrivee' },
                { text: 'Prix', value: 'prix' },
                { text: 'Action', value: 'action' }
            ],
            ticketBooked: false
        }
    },
    methods:{
        bookTicket(item){
            fetch("http://localhost:5000/" +  this.user + "/billet/add/" + item.id)
                .then(function(response){
                    return response.json()
                }).then((json) =>
                {
                    this.ticketBooked = (json.status == "success")
                    this.$emit("ticketbooked", this.ticketBooked)
                    this.fetchAll()
                }
            )
            alert("Billet réservé !")
        },
        fetchAll(){
            fetch("http://localhost:5000/billet/all/" + this.vol)
            .then(function (response) {
                return response.json()
            }).then((json) => {
                this.billets = json
                for (let i = 0; i < this.billets.length; ++i) {
                    this.billets[i].action = `` //To instantiate action
                }
            })
        }
    },
    mounted: function() {
       this.fetchAll()
    },
    watch: {
        vol:function () {
            this.fetchAll()
        }
    },
    template: `
    <div>
        <v-data-table :headers="headersBillets" :items="billets">
        <template v-slot:item.action="{ item }">
        <v-btn class="ma-2" color="primary" dark @click="bookTicket(item)">
            Ajouter
            <v-icon dark right>
                mdi-checkbox-marked-circle
            </v-icon>
        </v-btn>
        </template>
        </v-data-table>
    </div>
    `
}

var billetsReserves = {
    props: ['user', 'flag'],
    data: function () {
        return {
            billets: [],
            headersBillets: [
                { text: 'Code aéroport départ', value: 'codeDepart' },
                { text: 'Code aéroport d\'arrivée', value: 'codeArrivee' },
                { text: 'Date de départ', value: 'dateDepart' },
                { text: 'Date d\'arrivée', value: 'dateArrivee' },
                { text: 'Prix', value: 'prix' },
            ],
        }
    },
    methods: {
        fetchAll(){
            fetch("http://localhost:5000/" + this.user + "/billets/all")
            .then(function(response){
                return response.json()
            }).then((json) => {
                this.billets = json
            })
        }
    },
    mounted: function(){
        this.fetchAll()
    },
    watch:{
        flag:function(){
            this.fetchAll()
        }
    },
    template: `
    <div>
        <v-data-table :headers="headersBillets" :items="billets">
        </v-data-table>
    </div>
    `
}