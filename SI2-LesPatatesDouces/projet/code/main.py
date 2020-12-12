from flask import Flask, session, request, Response, jsonify
from BDD.bdd import BDD
from controller.aeroport_controller import AeroportController
from controller.vol_controller import VolController
from controller.user_controller import UserController
from controller.billet_controller import BilletController
from flask_cors import CORS
import sys

bdd = BDD()
aeroport_controller = AeroportController(bdd)
vol_controller = VolController(bdd)
billet_controller = BilletController(bdd)
user_controller = UserController(bdd)

app = Flask(__name__)
CORS(app)
app.secret_key='toto'

@app.route("/")


@app.route("/aeroport/all", methods=["GET"])
def get_all_aeroports():
    return aeroport_controller.get_all(), 200 # considéré comme la vue. La vue affiche les données normalement mais nous on les renvoie via une requete http.


@app.route("/vol/all", methods=["GET"])
def get_all_vols():
    return vol_controller.get_all(), 200 # considéré comme la vue. La vue affiche les données normalement mais nous on les renvoie via une requete http.


@app.route("/vol/<id>", methods=["GET"])
def get_vol_by_id(id):
    print(vol_controller.get_by_id(id))
    return vol_controller.get_by_id(id), 200


@app.route("/billet/all/<id>", methods=["GET"])
def get_all_billets(id):
    return billet_controller.get_all(id), 200


@app.route("/billet/<id>", methods=["GET"])
def get_billet_by_id(id):
    return billet_controller.get_by_id(id), 200


@app.route("/billet/add/<id>/<user>", methods=["GET","POST"])
def add_user_to_billet(id, user):
    userConnected = user_controller.get_user_connected(user)
    volId = billet_controller.set_user(id, userConnected.getId())
    vol_controller.decrease_tickets(volId)
    result = {'status': 'success'}
    return jsonify(result), 200


@app.route("/sign-up", methods=["GET","POST"])
def sign_up():
    if user_controller.add_user(request.json['email'], request.json['password']):
        result = {'status': 'success'}
        return jsonify(result), 200
    else:
        result = {'status': 'fail'}
        return jsonify(result), 200


@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    print(user_controller.check_user(request.json['email'], request.json['password']))
    if user_controller.check_user(request.json['email'], request.json['password']):
        result = {'status':'success'}
        user_controller.add_user_connected(request.json['email'])
        return jsonify(result),200
    else:
        result = {'status': 'fail'}
        return jsonify(result), 200


@app.route("/sign-out", methods=["POST"])
def sign_out():
    user_controller.remove_user_connected(request.json)
    return "",200



if __name__ == "__main__":
    app.run()
