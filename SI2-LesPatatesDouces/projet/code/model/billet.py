class Billet:
    def __init__(self, id: str, id_vol: int, codeDepart: str, codeArrivee: str, prix: int):
        self.id = id
        self.id_vol = id_vol
        self.codeDepart = codeDepart
        self.codeArrivee = codeArrivee
        self.prix = prix
        self.booked = False

    def to_dict(self):
        return {
            "id": self.id,
            "id_vol": self.id_vol,
            "codeDepart": self.codeDepart,
            "codeArrivee": self.codeArrivee,
            "prix": self.prix,
            "booked": self.booked
        }

    def get_vol(self):
        return self.id_vol