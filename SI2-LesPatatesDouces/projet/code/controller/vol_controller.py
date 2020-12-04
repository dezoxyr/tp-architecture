from flask import jsonify

class VolController :
    def __init__(self, bdd):
        self.bdd = bdd

    def get_all(self):
        # TODO faire les check
        list_vol = []
        for vol in self.bdd.get_list_vol():
            list_vol.append(vol.to_dict())

        return jsonify(list_vol) # Les met en forme pour la vue
