class Aeroport:
    def __init__(self, code: str, ville: str):
        self.code = code
        self.ville = ville

    def to_dict(self):
        return {
            "code": self.code,
            "ville": self.ville
        }