from model.aeroport import Aeroport
from model.vol import Vol
from model.User import User


class BDD:
    def __init__(self):
        self.list_aeroport = list()
        self.list_aeroport.append(Aeroport(1,"JFK", "New-York"))
        self.list_aeroport.append(Aeroport(2,"CDG", "Paris CDG"))
        self.list_aeroport.append(Aeroport(3,"DTW", "Detroit"))
        self.list_vol = list()
        self.list_vol.append(Vol(1, self.list_aeroport[0], self.list_aeroport[1], "05/12/2020", "05/12/2020", 50))
        self.list_vol.append(Vol(2, self.list_aeroport[2], self.list_aeroport[1], "06/12/2020", "06/12/2020", 25))
        self.list_vol.append(Vol(3, self.list_aeroport[2], self.list_aeroport[1], "07/12/2020", "07/12/2020", 100))
        self.list_user = list()
        self.list_user.append(User("nom","prenom","mdp"))
        self.list_user.append(User("nom1","prenom1","mdp1"))
        self.list_user.append(User("nom2","prenom2","mdp2"))

    def get_list_aeroport(self):
        return self.list_aeroport

    def get_list_vol(self):
        return self.list_vol

    def get_list_user(self):
        return self.list_user