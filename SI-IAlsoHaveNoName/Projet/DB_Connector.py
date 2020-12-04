# -*- coding: utf-8 -*-
"""
Created on Wed Dec  2 14:49:21 2020

@author: Hamza
"""
import sqlite3 , pandas 
class DATABASE:
    def __init__(self):
        self.connection = sqlite3.connect('DATABASE.db')
        self.cursor = self.connection.cursor()
    def Get_All_Users(self):
        self.cursor.execute("SELECT * FROM Users ;")
        data = pandas.DataFrame(self.cursor.fetchall(),columns =["Id_Users","Nom","Prenom"]) 
        return data
    def Get_All_Billet(self):
        self.cursor.execute("SELECT * FROM Billet ;")
        return self.cursor.fetchall()
    def Get_Number_of_Users(self):
        self.cursor.execute("SELECT COUNT(Id_Users) from Users;")
        return self.cursor.fetchall()[0][0]
    def Insert_New_User(self,Nom,Prenom):
        New_Index = self.Get_Number_of_Users()+1
        query = "INSERT INTO Users VALUES ("+str(New_Index)+", '"+Nom+"','"+Prenom+"')"
        self.Run_Query(query)
    def Get_Billet_Dispo(self):
        query = """SELECT Id_Billet , AA.Nom_Airoport as Fromm , A.Nom_Airoport as too , Prix , Date(_Date_)  , NB_Billet_Dispo  FROM Billet as B
                    INNER JOIN Airoport_ID as A on A.Id_Airoport = B.ID_Destination
                    INNER JOIN Airoport_ID as AA on AA.Id_Airoport = B.ID_Provenance
                    where NB_Billet_Dispo != 0
                    """
        self.cursor.execute(query)
        data = pandas.DataFrame(self.cursor.fetchall(),columns =["Id_Billet","From","To","Price","Date","Billet_Dispo"]) 
        return data
    def Run_Query(self , query):
        self.cursor.execute( query )
        self.connection.commit()
    def Close(self):
        self.cursor.close()
        self.connection.close()