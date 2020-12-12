from flask import jsonify
from copy import copy

class VolController :
    def __init__(self, bdd):
        self.bdd = bdd

    def get_all(self):
        # TODO faire les check
        list_vol = []
        for vol in self.bdd.get_list_vol():
            tmp_vol = copy(vol)
            list_vol.append(tmp_vol.to_dict())

        return jsonify(list_vol) # Les met en forme pour la vue


    def get_by_id(self, id:int):
        for vol in self.bdd.get_list_vol():
            if vol.id == int(id):
                return vol

    def decrease_tickets(self, id:int):
        vol = self.get_by_id(id)
        volUpdated = copy(vol)
        volUpdated.decreaseTickets()
        self.bdd.update_vol(vol, volUpdated)
