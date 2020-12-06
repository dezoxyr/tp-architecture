class User:
    def __init__(self, name: str, email: str, password: str):
        self.name = name
        self.email = email
        self.password = password
        self.billet_reserves = list()

    #TODO
    def addReservation(self,billet :int):
        self.billet_reserves.append(billet)

    #TODO
    def rmReservation(self,billet :int):
        self.billet_reserves.remove(billet)

    def getBillets(self):
        return self.billet_reserves

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password
        }