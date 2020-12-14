# -*- coding: utf-8 -*-

from tkinter import Button , Label , W , Tk , Entry
import requests
from User_Interface import User
from Admin_Interface import Admin

Admin_Log = {"Nom":'admin',"Prenom":"admin"} # Login Administrateur  

class Menu :
    def __init__(self , fenetre ):
        print(" Menu ")
        self.url = "http://127.0.0.1:5000/users"
        self.window = fenetre
        self.window.geometry("550x260")
        self.window.title(' Maghreb_United')
        self.Create_Button()
        self.Create_Entry()
        Label(self.window, text=""" Projet Architecture Distribue 
                 Groupe : Maghreb United 
                 """).grid(row=0 , column=0)
        Label(self.window, text=""" 
                 Membres :
                     Hamza BOUKHRISS / Mohamed AMTALSSI
                     Ibrahim LABIOD /  Oumaima BOUYAHY""").grid(row=4 , column=0)

    def Create_Button(self):
        Button(self.window,text="  Connection/Inscription ",
          command=self.Connection , fg='red').grid(row=3,column=1,sticky=W,pady=4)
    def Create_Entry(self):
        self.nom = Entry(self.window , width=10)
        self.prenom = Entry(self.window , width=10)
        Label(self.window, text=" Nom =>").grid(row=1 , column=0)
        self.nom.grid(row=1 , column=1)
        Label(self.window, text=" Prenom =>").grid(row=2 , column=0)
        self.prenom.grid(row=2 , column=1)

    def Connection(self):
        Input = {'Nom': self.nom.get(),'Prenom':self.prenom.get()}
        if Input["Nom"] == Admin_Log["Nom"] and Input["Prenom"] == Admin_Log["Prenom"]:
            new = self.Create_AND_Destroy()
            Admin(new)
            return
        req = requests.post(self.url, data = Input)
        INDEX = req.json()['Index']
        new = self.Create_AND_Destroy()
        User(new,INDEX)

    def Create_AND_Destroy(self):
        new_window = Tk()
        self.window.destroy()
        return new_window

window = Tk()
Menu(window)
window.mainloop()