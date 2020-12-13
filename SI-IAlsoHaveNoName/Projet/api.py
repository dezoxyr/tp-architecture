import sqlite3, pandas

class Database:
    def __init__(self):
        self.connection = sqlite3.connect('airplane.db')
        self.cursor = self.connection.cursor()

    def GetAllTicket(self):
        self.cursor.execute("SELECT * FROM billet;")
        return self.cursor.fetchall()

    def GetAllUsers(self):
        self.cursor.execute("SELECT Nom,Prenom FROM utilisateur;")
        data = pandas.DataFrame(self.cursor.fetchall(), columns =["Nom","Prenom"])
        return data
    
    def GetNbUsers(self):
        self.cursor.execute("SELECT COUNT(ID_Utilisateur) FROM utilisateur;")
        return self.cursor.fetchall()[0][0]
    
    def GetTicketAvailable(self):
        query="SELECT * FROM billet WHERE ID_Utilisateur IS NULL;"
        self.cursor.execute(query)
        data = pandas.DataFrame(self.cursor.fetchall(), columns=["ID_Billet", "Numero", "Prix", "ID_Destination", "ID_Depart", "ID_Utilisateur"])

    def AddNewUser(self, Mail, MotDePasse, Nom, Prenom, Date_Naissance, Sexe):
        new = self.GetNbUsers()+1
        query = "INSERT INTO utilisateur VALUES ('"+str(new)+"', '"+Mail+"', '"+MotDePasse+"', '"+Nom+"', '"+Prenom+"', '"+Date_Naissance+"', '"+Sexe+"')"
        self.Execute(query)

    def Execute(self, query):
        self.cursor.execute(query)
        self.connection.commit()

    def Close(self):
        self.cursor.close()
        self.connection.close()
