from model.aeroport import Aeroport


class BDD:
    def __init__(self):
        self.list_aeroport = list()
        self.list_aeroport.append(Aeroport(1,"JFK", "New-York"))
        self.list_aeroport.append(Aeroport(2,"CDG", "Paris CDG"))
        self.list_aeroport.append(Aeroport(3,"DTW", "Detroit"))

    def get_list_aeroport(self):
        return self.list_aeroport