from flask import Flask, session, request, Response, jsonify
from BDD.bdd import BDD
from controller.aeroport_controller import AeroportController
from controller.vol_controller import VolController
from controller.user_controller import UserController
from flask_cors import CORS

bdd = BDD()
aeroport_controller = AeroportController(bdd)
vol_controller = VolController(bdd)
user_controller = UserController(bdd)

app = Flask(__name__)
CORS(app)
app.secret_key='toto'

@app.route("/")


@app.route("/aeroport/all")
def get_all_aeroports():
    return aeroport_controller.get_all() # considéré comme la vue. La vue affiche les données normalement mais nous on les renvoie via une requete http.


@app.route("/vol/all")
def get_all_vols():
    return vol_controller.get_all() # considéré comme la vue. La vue affiche les données normalement mais nous on les renvoie via une requete http.


@app.route("/vol/<id>")
def get_vol_by_id(id):
    print(vol_controller.get_by_id(id))
    return vol_controller.get_by_id(id)

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
