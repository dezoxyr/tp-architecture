from flask import jsonify
from copy import copy

class BilletController :
    def __init__(self, bdd):
        self.bdd = bdd

    def get_all(self, id: int):
        # TODO faire les check
        list_billet = []
        for billet in self.bdd.get_list_billet():
            if billet.vol == int(id) and billet.user == None:
                list_billet.append(billet.to_dict())

        return jsonify(list_billet) # Les met en forme pour la vue

    def get_by_id(self, id: str):
        for billet in self.bdd.get_list_billet():
            if billet.id == str(id):
                return billet

    def set_user(self, id: int, user: str):
        billet = self.get_by_id(id)
        billetUpdated = copy(billet)
        billetUpdated.setUser(user)
        self.bdd.update_billet(billet, billetUpdated)
        return billet.getVol()