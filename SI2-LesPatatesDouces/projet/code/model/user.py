import uuid

class User:
    def __init__(self, email: str, password: str):
        self.id = str(uuid.uuid4())
        self.email = email
        self.password = password
        self.billets_reserves = list()

    def getId(self):
        return self.id

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password
        }