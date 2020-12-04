from BDD.bdd import BDD
from flask import jsonify

class UserController :
    def __init__(self, bdd):
        self.bdd = bdd

    def get_all(self):
        # TODO faire les check
        list_user = []
        for users in self.bdd. get_list_user():
            list_vol.append(users.to_dict())

        return jsonify(list_vol) # Les met en forme pour la vue
