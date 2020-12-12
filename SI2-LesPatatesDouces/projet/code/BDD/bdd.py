from model.aeroport import Aeroport
from model.vol import Vol
from model.user import User
from model.billet import Billet
import uuid


class BDD:
    def __init__(self):
        self.list_aeroport = list()
        self.list_aeroport.append(Aeroport(1, "JFK", "New-York"))
        self.list_aeroport.append(Aeroport(2, "CDG", "Paris CDG"))
        self.list_aeroport.append(Aeroport(3, "DTW", "Detroit"))


        self.list_vol = list()
        self.list_vol.append(Vol(1, self.list_aeroport[0], self.list_aeroport[1], "05/12/2020", "05/12/2020", 2))
        self.list_vol.append(Vol(2, self.list_aeroport[2], self.list_aeroport[1], "06/12/2020", "06/12/2020", 3))
        self.list_vol.append(Vol(3, self.list_aeroport[1], self.list_aeroport[2], "07/12/2020", "07/12/2020", 2))


        self.list_billet = list()
        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[0].getId(), self.list_aeroport[0].getCode(),
                                       self.list_aeroport[1].getCode(), 250))
        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[0].getId(), self.list_aeroport[0].getCode(),
                                       self.list_aeroport[1].getCode(), 250))

        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[1].getId(), self.list_aeroport[2].getCode(),
                                       self.list_aeroport[1].getCode(), 300))
        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[1].getId(), self.list_aeroport[2].getCode(),
                                       self.list_aeroport[1].getCode(), 300))
        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[1].getId(), self.list_aeroport[2].getCode(),
                                       self.list_aeroport[1].getCode(), 300))

        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[2].getId(), self.list_aeroport[2].getCode(),
                                       self.list_aeroport[1].getCode(), 310))
        self.list_billet.append(Billet(str(uuid.uuid4()), self.list_vol[2].getId(), self.list_aeroport[2].getCode(),
                                       self.list_aeroport[1].getCode(), 310))


        self.list_user = list()
        self.list_user.append(User("azerty@gmail.com", "mdp"))
        self.list_user.append(User("qwerty@gmail.com", "mdp"))
        self.list_user_connected = list()

    def get_list_aeroport(self):
        return self.list_aeroport

    def get_list_vol(self):
        return self.list_vol

    def decrement_billets(self, vol):
        for v in self.list_vol:
            if v.id == vol.id:
                v.nombre_billets -=1

    def get_list_billet(self):
        return self.list_billet

    # Récupère les billets d'un utilisateur grâce à son email
    def get_billets_by_email(self, email):
        list_billets= []
        for u in self.list_user:
            if u.email == email:
                for billet_reserve in u.billets_reserves:
                    for billet in self.list_billet:
                        if billet_reserve == billet.id:
                            list_billets.append(billet)

                return list_billets

    def add_user(self, user):
        self.list_user.append(user)

    def get_list_user(self):
        return self.list_user

    def book_billet(self, index_user, id_billet):
        self.list_user[index_user].billets_reserves.append(id_billet)

    def add_user_connected(self, email):
        self.list_user_connected.append(email)

    def remove_user_connected(self, email):
        for user in range(len(self.list_user_connected)):
            print(len(self.list_user))
            if self.list_user_connected[user] == email:
                index = user
                self.list_user_connected.pop(index)
                break
