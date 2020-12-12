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
        self.list_vol.append(Vol(3, self.list_aeroport[2], self.list_aeroport[1], "07/12/2020", "07/12/2020", 2))


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
        self.list_user.append(User("nom", "toto", "mdp"))
        self.list_user.append(User("nom1", "email1", "mdp1"))
        self.list_user.append(User("nom2", "email2", "mdp2"))
        self.list_user_connected = list()

    def get_list_aeroport(self):
        return self.list_aeroport

    def get_list_vol(self):
        return self.list_vol

    def update_vol(self, vol, volUpdated):
        index = self.list_vol.index(vol)
        self.list_vol[index] = volUpdated

    def get_list_billet(self):
        return self.list_billet

    def update_billet(self, billet, billetUpdated):
        index = self.list_billet.index(billet)
        self.list_billet[index] = billetUpdated

    def add_user(self, user):
        self.list_user.append(user)

    def get_list_user(self):
        return self.list_user

    def update_user(self, user, userUpdated):
        index = self.list_user.index(user)
        self.list_user[index] = userUpdated

    def add_user_connected(self, email):
        self.list_user_connected.append(email)

    def get_user_connected(self):
        return self.list_user_connected

    def remove_user_connected(self, email):
        index = 0
        for user in range(len(self.list_user)):
            if self.list_user_connected[user] == email:
                index = user
                break

        self.list_user_connected.pop(index)
