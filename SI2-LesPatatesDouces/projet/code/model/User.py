class User:
    def __init__(self, name: str, email: str, password: str):
        self.name = name
        self.email = email
        self.password = password
        self.billetReserve = list()

    #TODO
    def addReservation(self,billet :int):
        self.billetReserve.append(billet)

    #TODO
    def rmReservation(self,billet :int):
        self.billetReserve.remove(billet)

    def getBillets(self):
        return self.billetReserve

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password
        }