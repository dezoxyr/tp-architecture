from BDD.bdd import BDD
from model.user import User
from flask import jsonify

class UserController :
    def __init__(self, bdd):
        self.bdd = bdd

    def get_all(self):
        # TODO faire les check
        list_user = []
        for users in self.bdd.get_list_user():
            list_user.append(users.to_dict())

        return jsonify(list_user) # Les met en forme pour la vue

    def check_user(self, email:str, password:str):
        for user in self.bdd.get_list_user():
            if email == user.email and password == user.password:
                return True

        return False

    def add_user(self, email: str, password: str):
        for user in self.bdd.get_list_user():
            if email == user.email:
                return False

        self.bdd.add_user(User("toti", email, password)) # Everybody is Toti
        return True

    def add_user_connected(self, email:str):
        self.bdd.add_user_connected(email)

    def remove_user_connected(self, email:str):
        self.bdd.remove_user_connected(email)