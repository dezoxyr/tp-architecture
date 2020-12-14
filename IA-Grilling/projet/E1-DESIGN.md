# Architecture globale:
Nous avons choisi de faire une architecture de type REST.<br>
Le client interragit avec une API via des requêtes de type GET ou POST<br>
L'API va ensuite soit récupérer des données sur la base de données s'il s'agit d'une requête de type GET, ou modifier des données s'il s'agit d'une requête POST.<br>

![Architecture_globale](https://user-images.githubusercontent.com/44286703/101782231-19b06800-3b3c-11eb-80b0-f96eae134d20.png)

# Modèle de données:
Modèle textuel: fichiers .json stockés en ligne
Nous avons 2 tables sous forme de fichiers .json: <br>
- La première table contient une liste de string, chaque élément de cette liste représentant un billet.
- La seconde table contient une liste d'objet User, chaque User contient un Username et une liste de string contenant les billets qu'il a réservé.

![data_model2](https://user-images.githubusercontent.com/44286703/101782056-e968c980-3b3b-11eb-9a48-ed4b25eebc70.png)
# Stack technique:
Langages: HTML, Javascript, CSS<br>
Outils: Notepad++, GitHub, Microsoft Teams, Discord, Node.js, Express JS avec 6 dependencies: body-parser; cors; express; helmet; morgan; node-fetch. 
