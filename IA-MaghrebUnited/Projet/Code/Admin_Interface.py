# -*- coding: utf-8 -*-


from tkinter import Button , Label , W , Tk , Entry
import requests , pandas 
from tkcalendar import DateEntry

class Admin :
    def __init__(self , fenetre ):
        print(" Menu ")
        self.url = "http://127.0.0.1:5000/"
        self.window = fenetre
        self.window.title(' Maghreb_United Administrator')
        self.All_Reservation()
    
    def All_Reservation(self):
        self.Header("      Liste des Resrvations   ")
        Field = [" Nom    |","  Prenom  |","      Depart     |","    Destination  |","  Date  "]
        for i in range(len(Field)):
            Label(self.window, text=Field[i]).grid(row=1 , column=i)
        req = requests.get(self.url+"info")
        data  = pandas.DataFrame.from_dict(req.json()['data'] )
        if( req.status_code == 404 ):
            print( " Not Found" )
        try:
            data  = pandas.DataFrame.from_dict(req.json()['data'] )
        except : 
            self.window.geometry("790x150")
            return
        nbL = 2  
        for i in data.values:
            nbC = 0
            for j in i[2:] :
                Label(self.window, text= str(j) ).grid(row=nbL , column=nbC)
                nbC += 1
            Button(self.window,text='Annuler',command= lambda ID=i[:2] : self.Annuler_Reservation( ID[0] , ID[1] )).grid(row=nbL,column=nbC,sticky=W,pady=4)
            nbL += 1
        self.window.geometry("790x"+str((nbL-1)*40+50))
   
    def Annuler_Reservation(self, Id_User , Id_Vol):
        Input = {'Mode':'Delete','Id_User': Id_User ,'Id_Vol':Id_Vol }
        req = requests.post(self.url+"billets", data = Input)
        if( req.status_code == 200 ):
            print(" Vol annuler ")
        self.All_Reservation()
    
    def All_Users(self):
        self.Header("      Liste des Utilisateurs   ")
        Field = [" Nom    |","  Prenom  |"]
        for i in range(len(Field)):
            Label(self.window, text=Field[i]).grid(row=1 , column=i)
        req = requests.get(self.url+"users")
        try:
            data  = pandas.DataFrame.from_dict(req.json()['data'] )
        except:
            self.window.geometry("790x150")
            return        
        nbL = 2  
        for i in data.values:
            nbC = 0
            for j in i[1:] :
                Label(self.window, text= str(j) ).grid(row=nbL , column=nbC)
                nbC += 1
            Button(self.window,text='Annuler',command= lambda ID=i[0] : self.Delete_User( ID )).grid(row=nbL,column=nbC,sticky=W,pady=4)
            nbL += 1
        self.window.geometry("790x"+str((nbL-1)*40+50))
    
    def Delete_User(self , Id_User):
        Input = {'Id':Id_User , "Mode":'User'}
        req = requests.get(self.url+"admin", data = Input)
        if( req.status_code == 200 ):
            print(" Utilisateur supprimer ")
        self.All_Users()
    
    def Create_Vols(self):
        self.Header(" Creation de Vols")
        self.window.geometry("790x200")
        Field = ["      Depart     |","    Destination  |","       Prix      |","      Date       |","  Nombre de billet dispo "]
        for i in range(len(Field)):
            Label(self.window, text=Field[i]).grid(row=1 , column=i)
        self.Data_insert = []
        self.Data_insert.append( Entry(self.window , width=10) )
        self.Data_insert.append( Entry(self.window , width=10) )
        self.Data_insert.append( Entry(self.window , width=10) )
        self.Data_insert.append( DateEntry(self.window,locale='fr_FR', date_pattern='yy-mm-dd' , width=10,bg="darkblue",fg="white",year=2020) )
        self.Data_insert.append( Entry(self.window , width=10) )
        
        for i in range( 5 ):
            self.Data_insert[i].grid(row=2,column=i,sticky=W,pady=4)
       
        Button(self.window,text='Creation',command=self.Creation_Vols).grid(row=3,column=4,sticky=W,pady=4)
    
    def Creation_Vols(self):           
        Input = {'From':self.Data_insert[0].get() ,'To':self.Data_insert[1].get() , 'Price':self.Data_insert[2].get() , 
                 'Date' : "20"+self.Data_insert[3].get()  , 'NB':self.Data_insert[4].get() }
        req = requests.post(self.url+"admin", data = Input)
        if( req.status_code == 200 ):
            print(" Vol Creer ")
        self.List_Vols()
    
    def List_Vols(self):
        self.Header("  Liste de Vols ")
        Field = ["      Depart     |","    Destination  |","       Prix      |","      Date       |","  Nombre de billet dispo "]
        for i in range(len(Field)):
            Label(self.window, text=Field[i]).grid(row=1 , column=i)
        
        req = requests.get(self.url+"billets")
        try:
            data  = pandas.DataFrame.from_dict(req.json()['data'] )
        except:
            self.window.geometry("790x150")
            return        
        nbL = 2  
        for i in data.values:
            nbC = 0
            for j in i[1:] :
                Label(self.window, text= str(j) ).grid(row=nbL , column=nbC)
                nbC += 1
            Button(self.window,text='Annuler',command= lambda ID=i[0] : self.Delete_Vols( ID )).grid(row=nbL,column=nbC,sticky=W,pady=4)
            nbL += 1
        self.window.geometry("790x"+str((nbL-1)*40+50))

    def Delete_Vols(self,Id_Vol):
        Input = {'Id':Id_Vol  , "Mode":'Vol'}
        req = requests.get(self.url+"admin", data = Input)
        if( req.status_code == 200 ):
            print(" Vol Supprimer ")
        self.List_Vols()
        
    def Header(self,str_Pres):
        self.Clean_Screen()
        Label(self.window, text=str_Pres).grid(row=0 , column=0)
        Button(self.window,text='Nos Clients',command= self.All_Users).grid(row=0,column=1,sticky=W,pady=4)
        Button(self.window,text='Nos Reservations',command= self.All_Reservation).grid(row=0,column=2,sticky=W,pady=4)
        Button(self.window,text='List des Vols',command= self.List_Vols).grid(row=0,column=3,sticky=W,pady=4)
        Button(self.window,text='Creation de Vols',command= self.Create_Vols).grid(row=0,column=4,sticky=W,pady=4)

    def Clean_Screen(self):
        for label in self.window.children.values():
            label.pack_forget()
            label.grid_forget()
    def Create_AND_Destroy(self):
        new_window = Tk()
        self.window.destroy()
        return new_window

