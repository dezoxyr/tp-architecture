# -*- coding: utf-8 -*-
"""
Created on Wed Dec  2 20:48:58 2020

@author: Hamza
"""

from flask import Flask
from flask_restful import Resource, Api, reqparse
import DB_Connector as DB 
"""
http://localhost:5000/billets
http://localhost:5000/users
http://127.0.0.1:5000/users?Nom=NOM_TEST&Prenom=Prenom_TEST
"""

class Billet(Resource):
    def get(self):
        Connection = DB.DATABASE()
        data = Connection.Get_Billet_Dispo()
        data = data.to_dict()
        Connection.Close()
        return {'data': data}, 200

class Users(Resource):
    def get(self):
        Connection = DB.DATABASE()
        data = Connection.Get_All_Users()
        data = data.to_dict()
        Connection.Close()
        return {'data': data}, 200
    def post(self):
        parser = reqparse.RequestParser()  # initialize
        parser.add_argument('Nom', required=True)
        parser.add_argument('Prenom', required=True)
        args = parser.parse_args()  # parse arguments to dictionary
        Connection = DB.DATABASE()
        Connection.Insert_New_User(args['Nom'] ,args['Prenom'] )
        Connection.Close()
        return {'Statut':'Done'},200


app = Flask(__name__)
api = Api(app)    

api.add_resource(Users, '/users')  
api.add_resource(Billet, '/billets') 



app.run()
#Connection.Close()