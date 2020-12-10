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
        self.cursor.execute("SELECT MAX(Id_Users) from Users;")
        return self.cursor.fetchall()[0][0]
    
    def Reservation(self , Indx_Users , Indx_Vol ):
        # on verifie si il ya deja une reservation pour eviter les doublons
        self.Run_Query("INSERT INTO User_Reservation VALUES("+str(Indx_Users)+","+str(Indx_Vol)+")")
        self.Run_Query("Update Billet Set NB_Billet_Dispo=NB_Billet_Dispo-1 where Id_Billet like "+str(Indx_Vol))
    
    def Insert_New_User(self,Nom,Prenom):
        New_Index = self.Get_Number_of_Users()+1
        query = "INSERT INTO Users VALUES ("+str(New_Index)+", '"+Nom+"','"+Prenom+"')"
        self.Run_Query(query)
    
    def Get_Billet_Dispo(self):
        query = """
        SELECT Id_Billet , AA.Nom_Airoport as Fromm , A.Nom_Airoport as too , Prix , Date(_Date_)  , NB_Billet_Dispo  FROM Billet as B
        INNER JOIN Airoport_ID as A on A.Id_Airoport = B.ID_Destination
        INNER JOIN Airoport_ID as AA on AA.Id_Airoport = B.ID_Provenance
        where NB_Billet_Dispo != 0
        """
        self.cursor.execute(query)
        data = pandas.DataFrame(self.cursor.fetchall(),columns =["Id_Billet","From","To","Price","Date","Billet_Dispo"]) 
        return data
    
    def Delete_User(self,Id_User):
        self.Run_Query("Update Billet Set NB_Billet_Dispo=NB_Billet_Dispo+1 where Id_Billet in ( select Id_Vol from User_Reservation where Id_User =="+str(Id_User)+")")
        self.Run_Query("DELETE from User_Reservation where Id_User = "+str(Id_User))                                                                 
        self.Run_Query("DELETE from Users where Id_Users = "+str(Id_User))   
    
    def Get_ALL_Users_Reservation(self):
        query = """
        SELECT UR.Id_User , Id_Billet ,U.Nom as NOM , U.Prenom as Prenom , AA.Nom_Airoport as Fromm , A.Nom_Airoport as too , Date(_Date_) FROM Billet as B
        INNER JOIN Airoport_ID as A on A.Id_Airoport = B.ID_Destination
        INNER JOIN Airoport_ID as AA on AA.Id_Airoport = B.ID_Provenance
        INNER JOIN User_Reservation as UR on UR.Id_Vol = B.Id_Billet
        INNER JOIN Users as U on U.Id_Users = UR.Id_User
        """
        self.cursor.execute(query)
        data = pandas.DataFrame(self.cursor.fetchall(),columns =["Id_User","Id_Billet","Nom","Prenom","From","To","Date"]) 
        return data
    
    def Get_ID_User(self,Nom,Prenom):
        self.cursor.execute("SELECT Id_Users FROM Users as U where Nom like '"+Nom+"' and Prenom like '"+Prenom+"' ")
        out  = self.cursor.fetchall()
        if len( out ) == 0 :
            return None
        return out[0][0]
    
    def Return_INDX_User_Creat_user_if_not_existe(self,Nom,Prenom):        
        if( self.Get_ID_User(Nom,Prenom) == None ):# si l'utilisateur n'existe pas on le creer 
            self.Insert_New_User(Nom,Prenom)
        Indx_User = self.Get_ID_User(Nom,Prenom)# on recupere son ID 
        return Indx_User
    
    def Reservation_User_NP_ID_VOL(self,Nom,Prenom,Id_Vol):
        # on test si le billet existe ou n'est pas dispo 
        self.cursor.execute("SELECT * FROM Billet as B where NB_Billet_Dispo != 0 and Id_Billet like "+str(Id_Vol))
        if len(self.cursor.fetchall()) == 0 :
            return -1
        Indx_User = self.Return_INDX_User_Creat_user_if_not_existe(Nom,Prenom)# on recupere son ID 
        self.Reservation(Indx_User,Id_Vol)
        #on decremente le nombre de billet 
        self.Run_Query("Update Billet Set NB_Billet_Dispo=NB_Billet_Dispo-1 where Id_Billet like "+str(Id_Vol))
    
    def Get_Reservation_User(self,INDX_User):
        query = """
        SELECT Id_Billet , AA.Nom_Airoport as Fromm , A.Nom_Airoport as too , Date(_Date_) FROM Billet as B
        INNER JOIN Airoport_ID as A on A.Id_Airoport = B.ID_Destination
        INNER JOIN Airoport_ID as AA on AA.Id_Airoport = B.ID_Provenance
        INNER JOIN User_Reservation as UR on UR.Id_Vol = B.Id_Billet
        INNER JOIN Users as U on U.Id_Users = UR.Id_User
        where Id_User = """+str(INDX_User)
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        if( len(data) == 0 ):
            return -1
        return pandas.DataFrame(data,columns =["Id_Billet","From","To","Date"]) 
   
    def Delete_Reservation(self,Id_User,Id_Vol):
        self.Run_Query("DELETE from User_Reservation where Id_User = "+str(Id_User)+" and Id_Vol = "+str(Id_Vol))
        self.Run_Query("Update Billet Set NB_Billet_Dispo=NB_Billet_Dispo+1 where Id_Billet like "+str(Id_Vol))
    
    def Get_Billet_Dispo_for_User(self,ID_User):
        query = """
        SELECT Id_Billet , AA.Nom_Airoport as Fromm , A.Nom_Airoport as too , Prix , Date(_Date_)  , NB_Billet_Dispo  FROM Billet as B
        INNER JOIN Airoport_ID as A on A.Id_Airoport = B.ID_Destination
        INNER JOIN Airoport_ID as AA on AA.Id_Airoport = B.ID_Provenance
        where NB_Billet_Dispo != 0 and Id_Billet not in ( select Id_Vol from User_Reservation where Id_User = """
        query += str(ID_User)+")"                             
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        if( len(data) == 0 ):
            return -1
        return pandas.DataFrame(data,columns =["Id_Billet","From","To","Price","Date","Billet_Dispo"])  
    
    def Get_Index_Destination_IfNot_Creat_It(self,Destination):
        self.cursor.execute("SELECT Id_Airoport from Airoport_ID where Nom_Airoport == '"+str(Destination)+"'")
        out = self.cursor.fetchall()
        if len(out) == 0 :# destination n'existe pas , on la créer
            self.cursor.execute("SELECT MAX(Id_Airoport) from Airoport_ID;")
            New_Index = self.cursor.fetchall()[0][0]+1
            query = "INSERT INTO Airoport_ID VALUES ("+str(New_Index)+", '"+Destination+"')"
            self.Run_Query(query)
            return New_Index
        return out[0][0]
   
    def Delete_Vol(self,Id_Vol):
        self.Run_Query("DELETE from User_Reservation where Id_Vol = "+str(Id_Vol))  
        self.Run_Query("DELETE from Billet where Id_Billet = "+str(Id_Vol))  

    def Create_Vol(self,From,To,Date,Prix,NB):
        self.cursor.execute("select MAX(Id_Billet) from Billet")
        index = self.cursor.fetchall()[0][0]+1
        id_from = self.Get_Index_Destination_IfNot_Creat_It(From)
        id_to = self.Get_Index_Destination_IfNot_Creat_It(To)
        query = "INSERT INTO Billet VALUES ("+str(index)+","+str(id_from)+","+str(id_to)+",'"+str(Date)+"','"+str(Prix)+"','"+str(NB)+"')"
        self.Run_Query(query)
    
    def Run_Query(self , query):
        self.cursor.execute( query )
        self.connection.commit()
    
    def Close(self):
        self.cursor.close()
        self.connection.close()
                
        
    