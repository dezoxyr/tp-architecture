from flask import jsonify

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

    def get_by_id(self, id: int):
        for billet in self.bdd.get_list_billet():
            if billet.id == int(id):
                return jsonify(billet.to_dict())