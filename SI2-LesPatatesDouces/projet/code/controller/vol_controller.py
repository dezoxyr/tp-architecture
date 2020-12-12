from flask import jsonify
from copy import copy

class VolController :
    def __init__(self, bdd):
        self.bdd = bdd

    # Récupère tous les vols disponibles
    def get_all(self):
        list_vol = []
        for vol in self.bdd.get_list_vol():
            tmp_vol = copy(vol)
            list_vol.append(tmp_vol.to_dict())

        return jsonify(list_vol)

    # Récupère un vol grâce à son identifiant
    def get_by_id(self, id_vol:int):
        for vol in self.bdd.get_list_vol():
            if vol.id == int(id_vol):
                return vol

    # Dérémente le nombre de places disponibles du vol grâce à son identifiant
    def decrease_billets(self, id_vol:int):
        vol = self.get_by_id(id_vol)
        self.bdd.decrement_billets(vol)
