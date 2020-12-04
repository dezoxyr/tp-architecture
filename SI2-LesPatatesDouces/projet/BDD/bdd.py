from model.aeroport import Aeroport


class BDD:
    def __init__(self):
        self.list_aeroport = list()
        self.list_aeroport.append(Aeroport("JFK", "New-York"))
        self.list_aeroport.append(Aeroport("CDG", "Paris CDG"))
        self.list_aeroport.append(Aeroport("DTW", "Detroit"))

    def get_list_aeroport(self):
        return self.list_aeroport