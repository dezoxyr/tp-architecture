class Aeroport:
    def __init__(self, id: int, code: str, ville: str):
        self.id = id
        self.code = code
        self.ville = ville

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "ville": self.ville
        }

    def getCode(self):
        return self.code