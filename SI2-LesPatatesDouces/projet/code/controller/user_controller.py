from BDD.bdd import BDD
from model.user import User
from flask import jsonify


class UserController:
    def __init__(self, bdd):
        self.bdd = bdd

    # Récupère tous les utilisateurs de la base de données
    def get_all(self):
        list_user = []
        for users in self.bdd.get_list_user():
            list_user.append(users.to_dict())

        return jsonify(list_user)

    # Récupère l'utilisateur grâce à son email/identifiant
    def get_by_email(self, email: str):
        for user in self.bdd.get_list_user():
            if user.id == str(email):
                return user

    # Vérifie si l'utilisateur existe
    def check_user(self, email: str, password: str):
        for user in self.bdd.get_list_user():
            if email == user.email and password == user.password:
                return True

        return False

    # Ajoute un utilisateur à la base de données
    def add_user(self, email: str, password: str):
        for user in self.bdd.get_list_user():
            if email == user.email:
                return False

        self.bdd.add_user(User(email, password))
        return True

    # Ajoute un utilisateur à la liste des utilisateurs connectés
    def add_user_connected(self, email: str):
        self.bdd.add_user_connected(email)

    ''' # Récupère l'utilisateur parmi ceux connectés
    def get_user_connected(self, email: str):
        for user in self.bdd.get_list_user():
            if user.email == str(email):
                return user
    '''

    # Supprime un utilisateur des utilisateurs connectés
    def remove_user_connected(self, email: str):
        self.bdd.remove_user_connected(email)

    # Ajoute un billet à la liste des billets réservés
    def add_billet(self, user, id_billet: str):
        list_user = self.bdd.get_list_user()
        for u in range(len(list_user)):
            if list_user[u].email == user:
                self.bdd.book_billet(u, id_billet)
                return True

        return False

    # Récupère tous les billets réservés d'un utilisateur
    def get_billets(self, email: str):
        list_billets =[]
        for billet in self.bdd.get_billets_by_email(email):
            list_billets.append(billet.to_dict())

        return list_billets


