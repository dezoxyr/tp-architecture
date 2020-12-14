class Vol:
    def __init__(self, id: int, aeroport_depart, aeroport_arrivee, date_depart: str, date_arrivee: str,
                 nombre_billets: int):
        self.id = id
        self.aeroport_depart = aeroport_depart
        self.aeroport_arrivee = aeroport_arrivee
        self.date_depart = date_depart
        self.date_arrivee = date_arrivee
        self.nombre_billets = nombre_billets

    def to_dict(self):
        return {
            "id": self.id,
            "depart": self.aeroport_depart.to_dict(),
            "arrivee": self.aeroport_arrivee.to_dict(),
            "date_depart": self.date_depart,
            "date_arrivee": self.date_arrivee,
            "nombre_billets": self.nombre_billets
        }

    def getId(self):
        return self.id
