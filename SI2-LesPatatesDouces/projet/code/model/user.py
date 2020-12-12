import uuid

class User:
    def __init__(self, name: str, email: str, password: str):
        self.id = str(uuid.uuid4())
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

    def getId(self):
        return self.id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password
        }