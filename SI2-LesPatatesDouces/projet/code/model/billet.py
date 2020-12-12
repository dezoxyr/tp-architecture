class Billet:
    def __init__(self, id: str, vol: int, codeDepart: str, codeArrivee: str, prix: int):
        self.id = id
        self.vol = vol
        self.codeDepart = codeDepart
        self.codeArrivee = codeArrivee
        self.prix = prix
        self.user = None


    def to_dict(self):
        return {
            "id": self.id,
            "vol": self.vol,
            "codeDepart": self.codeDepart,
            "codeArrivee": self.codeArrivee,
            "prix": self.prix,
            "user": self.user
        }

    def setUser(self, user: str):
        self.user = user

    def getVol(self):
        return self.vol