from flask import jsonify

class BilletController :
    def __init__(self, bdd):
        self.bdd = bdd

    # Récupère tous les billets d'un vol
    def get_all_from_vol(self, id_vol: int):
        list_billets = []
        for billet in self.bdd.get_list_billet():
            if billet.id_vol == int(id_vol) and billet.booked == False:
                list_billets.append(billet.to_dict())

        return jsonify(list_billets)

    # Récupère l'objet billet à partir de son id
    def get_by_id(self, id_billet: str):
        for billet in self.bdd.get_list_billet():
            if billet.id == str(id_billet):
                return billet

    # Récupère l'objet vol à partir de l'identifiant du billet
    def get_vol_by_id_billet(self, id_billet: str):
        for billet in self.bdd.get_list_billet():
            if billet.id == id_billet:
                return billet.get_vol()

    # Réserve un billet
    def book(self, id_billet):
        self.get_by_id(id_billet).booked = True
