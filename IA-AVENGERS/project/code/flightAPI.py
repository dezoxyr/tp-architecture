# KHETIM Wassil, MALDEREZ Alexis, MARGNAC Thomas, MESSIBAH Elias, ZEIDAN Carla
import flask
from flask_cors import CORS
from random import randint

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>API de voyage</h1><p>Pour avoir les vols disponible allez à l'adresse suivante /api/flights/all</p>"

flights_list = [
    {'flightID':0,
     'departureID':'CDG',
     'arrivalID':'JFK',
     'price':400,
     'seats':192,
     'departure_time':'12/02/2021 18:15:28',
     'arrival_time':'13/02/2021 01:15:28'},
    {'flightID':1,
     'departureID':'JFK',
     'arrivalID':'CDG',
     'price':400,
     'seats':144,
     'departure_time':'12/04/2021 09:20:51',
     'arrival_time':'12/04/2021 16:20:51'},
     {'flightID':2,
     'departureID':'DTW',
     'arrivalID':'JFK',
     'price':350,
     'seats':144,
     'departure_time':'13/06/2021 16:11:33',
     'arrival_time':'13/06/2021 18:11:33'},
     {'flightID':3,
     'departureID':'JFK',
     'arrivalID':'DTW',
     'price':350,
     'seats':144,
     'departure_time':'11/07/2021 05:49:01',
     'arrival_time':'11/07/2021 07:49:01'},
     {'flightID':4,
     'departureID':'CDG',
     'arrivalID':'DTW',
     'price':575,
     'seats':144,
     'departure_time':'26/01/2021 11:16:51',
     'arrival_time':'26/01/2021 20:16:51'},
     {'flightID':5,
     'departureID':'DTW',
     'arrivalID':'CDG',
     'price':575,
     'seats':144,
     'departure_time':'28/04/2021 04:18:08',
     'arrival_time':'28/04/2021 13:18:08'}
]

orders = [
    
]

@app.route('/api/flights/all', methods=['GET'])
def all_flights_call():
    return flask.jsonify(flights_list)

@app.route('/api/flights', methods=['GET'])
def specific_flight_call():
    if 'flightID' in flask.request.args:
        id = int(flask.request.args['flightID'])
    else:
        return "Vous n'avez pas précisé ou vous vous êtes trompé d'identifiant du vol"
    resultat = []
    for vol in flights_list:
        if vol['flightID'] == id:
            resultat.append(vol)
    return flask.jsonify(resultat)

@app.route('/api/<user_id>/orders', methods=['GET','POST'])
def user_orders_call(user_id):
    if flask.request.method == 'GET':
        thisCustomer = []
        if len(orders) == 0:
            return flask.jsonify(thisCustomer)
        else:
            for order in orders:
                if str(order['customerID']) == str(user_id):
                    thisCustomer.append(order)
            return flask.jsonify(thisCustomer)
    elif flask.request.method == 'POST':
        if 'flightID' in flask.request.args:
            theFlightId = int(flask.request.args['flightID'])
            for flight in flights_list:
            	if flight['flightID'] == theFlightId:
            		selectedFlight = flight
            		theCustomer = str(user_id)
            		order_index = len(orders)
            		theSeat = randint(1, 200)
            		theOrder = {'customerID':theCustomer,
								'orderID':order_index,
								'seatID':theSeat,
								'flightID':flight['flightID'],
								'departureID':flight['departureID'],
								'arrivalID':flight['arrivalID'],
								'price':flight['price'],
								'seats':flight['seats'],
								'departure_time':flight['departure_time'],
								'arrival_time':flight['arrival_time']}
            		orders.append(theOrder)
            return "Votre réservation à été faite", 201
        else:
            return "Veuillez préciser le vol", 400
    else:
        return "Erreur, seules les méthodes GET ou POST sont acceptées", 400

@app.route('/api/<user_id>/cancel', methods=['DELETE'])
def user_cancel_call(user_id):
    if flask.request.method == 'DELETE':
        if 'orderID' in flask.request.args:
            theOrderId = int(flask.request.args['orderID'])
            index = 0
            for theOrder in orders:
                if theOrder['orderID'] == theOrderId:
                    del orders[index]
                    return "Votre commande a bien été annulée", 201
                index += 1
            return "Votre réservation n'a pas été trouvée"
        else:
            return "Vous n'avez pas précisé la réservation à annuler", 400
        return "Valeur par defaut", 400
    else:
        return "Seulement la methode DELETE est acceptée", 400

app.run()
