const { triggerAsyncId } = require("async_hooks");

class Collection {
    constructor(table_name) {
        this.name = table_name;
        this.nextId = 1;
        this.data = [];
    }

    // Ajoute un élément dans la collection
    insert(row) {
        row.id = this.nextId++;
        this.data.push(row);
    }

    // Récupère tous les éléments coorespondant au filtre
    get(filter) {
        let keys = Object.keys(filter);
        let res = [];

        for (let i = 0; i < this.data.length; i++) {
            let j;
            for (j = 0; j < keys.length; j++)
                if (filter[keys[j]] != undefined && this.data[i][keys[j]] !== filter[keys[j]])
                    break;
            if (j == keys.length)
                res.push(this.data[i]);
        }
        return res;
    }

    // Récupère l'élément à l'index donné dans la collection
    valueAt(index) {
        if (index < 0 || index >= this.data.length) return undefined;
        return this.data[index];
    }

    // Modifie tous les éléments coorespondant au filtre
    update(filter, value) {
        let keys = Object.keys(filter);
        let vkeys = Object.keys(value);
        for (let i = 0; i < this.data.length; i++) {
            let j;
            for (j = 0; j < keys.length; j++)
                if (filter[keys[j]] != undefined && this.data[i][keys[j]] !== filter[keys[j]])
                    break;
            if (j == keys.length) {
                for (j = 0; j < vkeys.length; j++)
                    this.data[i][vkeys[j]] = value[vkeys[j]];
            }
        }


    }

    // Supprime tous les éléments coorespondant au filtre
    delete(filter) {
        let keys = Object.keys(filter);
        this.data = this.data.filter((v) => {
            for (let j = 0; j < keys.length; j++)
                if (filter[keys[j]] != undefined && v[keys[j]] !== filter[keys[j]])
                    return true;
            return false;
        });
    }

    // Nombre d'éléments dans la collection
    nb() {
        return this.data.length;
    }
}

module.exports = class Database {
    constructor() {
        this.users = new Collection('users');
        this.cities = new Collection('cities');
        this.travels = new Collection('travels');
        this.booking = new Collection('booking');

        // Ajout automatique des viles et vols possibles
        this.insertCity('New York', 'JFK');
        this.insertCity('CDG Paris', 'CDG');
        this.insertCity('Detroit', 'DTW');

        let nb_cities = this.cities.nb();
        for (let i = 0; i < nb_cities; i++) {
            for (let j = 0; j < i; j++)
                this.insertTravel(this.cities.valueAt(i), this.cities.valueAt(j), 400, Date.now());
            for (let j = i+1; j < nb_cities; j++)
                this.insertTravel(this.cities.valueAt(i), this.cities.valueAt(j), 400, Date.now());
        }
    }

    // Ajoute une ville dans la base de données
    insertCity(name, code) {
        this.cities.insert({
            name: name,
            code: code
        });
    }
    
    // Ajoute un vol dans la base de données
    insertTravel(origin, destination, price, date) {
        this.travels.insert({
            origin: origin,
            destination: destination,
            price: price,
            date : date
        });
    }

    // Ajoute une réservation dans la base de données
    insertBooking(user, travel) {
        this.booking.insert({
            user: user,
            travel: travel
        });
    }
}