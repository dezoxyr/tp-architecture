Pour lancer le programme vous aurez besoin de : - la bibliothèque python
Flask - la bibliothèque python Mariadb - la bibliothèque python
mysql.connector - du SGBD MariaDB que vous pouvez télécharger à ce lien
: https://mariadb.org/download/

Dans un premier temps il faut que vous modifiez le debut du fichier
bdd.py pour que les données correspondent au port, mdp , user et
database de votre mariadb. Executez ensuite le code python de bdd.py ,
ce qui va vous créer un base de données ses tables et remplir les users,
et quelques vols Vous devez ensuite aller modifier la partie
mariadb.connect au début du fichier app.py pour que les données
correspondent au port , mdp ,user et database de votre mariadb. Il faut
ensuite que vous lancez l'API flask (fichier app.py) que nous avons
faite Une fois cela fait vous pouvez lancer votre navigateur et aller à
l'adresse localhost:5000 Une fois sur la page de connexion, il y a deux
utilisateurs : 
Identifiant : Jean 
Mot de passe : mdpjean
Ou 
Identifiant : Bob 
Mot de passe : mdpbob
