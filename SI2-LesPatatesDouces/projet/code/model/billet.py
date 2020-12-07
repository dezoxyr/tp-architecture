class Billet:
    def __init__(self, id: str, vol, codeDepart: str, codeArrivee: str, prix: int):
        self.id = id
        self.vol = vol
        self.codeDepart = codeDepart
        self.codeArrivee = codeArrivee
        self.prix = prix


    def to_dict(self):
        return {
            "id": self.id,
            "vol": self.vol.to_dict(),
            "codeDepart": self.codeDepart,
            "codeArrivee": self.codeArrivee,
            "prix": self.prix
        }