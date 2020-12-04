# -*- coding; utf-8 -*-
"""
Auteurs :
    MORVAN Fanny
    LETHU Florian
    NOUMOWE Nathan
    BOURGEAIS Louis
    LAVEAU Hugo
"""

from fask import Flask
from flask_restful import Resource, Api, reqparse
import DB_Conenctor as DB

class Billet(Resource):

