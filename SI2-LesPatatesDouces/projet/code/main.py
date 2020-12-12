from flask import Flask, request, jsonify
from BDD.bdd import BDD
from controller.aeroport_controller import AeroportController
from controller.vol_controller import VolController
from controller.user_controller import UserController
from controller.billet_controller import BilletController
from flask_cors import CORS

bdd = BDD()
aeroport_controller = AeroportController(bdd)
vol_controller = VolController(bdd)
billet_controller = BilletController(bdd)
user_controller = UserController(bdd)

app = Flask(__name__)
CORS(app)


@app.route("/aeroport/all", methods=["GET"])
def get_all_aeroports():
    return aeroport_controller.get_all(), 200


@app.route("/vol/all", methods=["GET"])
def get_all_vols():
    return vol_controller.get_all(), 200


@app.route("/vol/<id_vol>", methods=["GET"])
def get_vol_by_id(id_vol):
    return vol_controller.get_by_id(id_vol), 200


@app.route("/billet/all/<id_vol>", methods=["GET"])
def get_all_billets(id_vol):
    return billet_controller.get_all_from_vol(id_vol), 200


@app.route("/<user>/billet/add/<id_billet>", methods=["GET","POST"])
def book_billet(id_billet, user):
    if user_controller.add_billet(user, id_billet):
        id_vol = billet_controller.get_vol_by_id_billet(id_billet)
        billet_controller.book(id_billet)
        vol_controller.decrease_billets(id_vol)
        result = {'status': 'success'}
        return jsonify(result), 200


@app.route("/<user>/billets/all", methods=["GET"])
def get_billets_user(user):
    list_billets = user_controller.get_billets(user)
    for billet in list_billets:
        id_vol = billet_controller.get_vol_by_id_billet(billet['id'])
        vol = vol_controller.get_by_id(id_vol)
        billet['dateDepart'] = vol.date_depart
        billet['dateArrivee'] = vol.date_arrivee

    return jsonify(list_billets), 200


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
