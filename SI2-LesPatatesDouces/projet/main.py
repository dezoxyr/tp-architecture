from flask import Flask
from controller.aeroport_controller import AeroportController
from BDD.bdd import BDD
from flask_cors import CORS

bdd = BDD()
aeroport_controller = AeroportController(bdd)

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World"

@app.route("/aeroport/all")
def get_all_aeroports():
    return aeroport_controller.get_all() # considéré comme la vue. La vue affiche les données normalement mais nous on les renvoie via une requete http.


if __name__ == "__main__":
    app.run()
