# -*- coding: utf-8 -*-


from tkinter import Button , Label , W , Tk
import requests , pandas 
class User :
    def __init__(self , fenetre , Index_User ):
        print(" Liste des Vols reserver")
        self.url = "http://localhost:5000/"
        self.Index_User = Index_User
        self.window = fenetre
        self.window.title(' Maghreb_United')
        self.List_Vol_For_Reservation()
    def List_Vol_For_Reservation(self):
        self.Clean_Screen()
        Label(self.window, text="      Liste des Vols   ").grid(row=0 , column=0)
        Button(self.window,text='Mes Reservations',command= self.List_Deja_Reserver).grid(row=0,column=1,sticky=W,pady=4)
        Field = ["      Depart     |","    Destination  |","       Prix      |","      Date       |","  Nombre de billet dispo "]
        for i in range( len(Field )):
            Label(self.window, text=Field[i]).grid(row=1 , column=i)
        Input = {'Id_User': self.Index_User}
        req = requests.get("http://localhost:5000/billets",data = Input)
        try:
            data  = pandas.DataFrame.from_dict(req.json()['data'] )
        except:
            self.window.geometry("790x200")
            return
        nbL = 2
        for i in data.values:
            nbC = 0
            for j in i[1:] :
                Label(self.window, text= str(j) ).grid(row=nbL , column=nbC)
                nbC += 1
            Button(self.window,text='Reserver',command= lambda ID=i[0] : self.Reservation( ID )).grid(row=nbL,column=nbC,sticky=W,pady=4)
            nbL += 1
        self.window.geometry("790x"+str((nbL-1)*40+50))# taille dynamique
    def List_Deja_Reserver(self):
        self.Clean_Screen()
        Label(self.window, text="Liste des Vols Reserver").grid(row=0 , column=0)
        Button(self.window,text='Reserver un Vols',command= self.List_Vol_For_Reservation).grid(row=0,column=1,sticky=W,pady=4)
        Label(self.window, text="      Depart     |").grid(row=1 , column=0)
        Label(self.window, text="    Destination  |").grid(row=1 , column=1)
        Label(self.window, text="    Date     |").grid(row=1 , column=3)
        Input = {'Id_User': self.Index_User}
        req = requests.post(self.url+"info", data = Input)
        if( req.status_code == 404 ):
            print( " Not Found" )
        try:
            data  = pandas.DataFrame.from_dict(req.json()['data'] )
        except : 
            self.window.geometry("790x200")
            return
        nbL = 2  
        for i in data.values:
            nbC = 0
            for j in i[1:] :
                Label(self.window, text= str(j) ).grid(row=nbL , column=nbC)
                nbC += 1
            Button(self.window,text='Annuler',command= lambda ID=i[0] : self.Annuler_Reservation( ID )).grid(row=nbL,column=nbC+1,sticky=W,pady=4)
            nbL += 1
        self.window.geometry("790x"+str((nbL-1)*40+50))
    def Reservation(self, INDX):
        Input = {'Mode':'Reserve','Id_User': self.Index_User ,'Id_Vol':INDX }
        req = requests.post(self.url+"billets", data = Input)
        if( req.status_code == 200 ):
            print(" Le Vol a été reserver ")
        self.List_Vol_For_Reservation()
    def Annuler_Reservation(self, INDX):
        Input = {'Mode':'Delete','Id_User': self.Index_User ,'Id_Vol':INDX }
        req = requests.post(self.url+"billets", data = Input)
        if( req.status_code == 200 ):
            print(" Vol annuler ")
        self.List_Deja_Reserver()
    def Clean_Screen(self):
        for label in self.window.children.values():
            label.pack_forget()
            label.grid_forget()
    def Create_AND_Destroy(self):
        new_window = Tk()
        self.window.destroy()
        return new_window
