
from flask import jsonify

class AeroportController :
    def __init__(self, bdd):
        self.bdd = bdd

    def get_all(self):
        # TODO faire les check
        list_aeroport = []
        for aeroport in self.bdd.get_list_aeroport():
            list_aeroport.append(aeroport.to_dict())

        return jsonify(list_aeroport) # Les met en forme pour la vue
