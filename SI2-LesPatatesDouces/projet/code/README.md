# Programmation distribuée : site de réservation en ligne
## Démarrage du serveur :
Le serveur se lance en exécutant la commande `python main.py` depuis le dossier tp_architecture/SI2-LesPatatesDouces/projet/code ou en lançant le fichier **main.py** depuis un IDE (PyCharm par exemple).

# Page d'accueil
Pour accéder à l'application, il suffit d'ouvrir le fichier **index.html** avec un navigateur.
Le site de réservations de billets d'avion propose alors à l'utilisateur de se connecter ou de s'inscrire.  
Deux utilisateurs pré-existent en base :

| email | mot de passe |
| - | - |
| azerty@gmail.com | mdp |
| qwerty@gmail.com | mdp |

Aucune vérification de la syntaxe de l'email et de la robustesse du mot de passe n'est effectuée lors de l'inscription.

# Page propre à chaque utilisateur
Une fois connecté, un tableau affiche la liste des vols disponibles, tableau par lequel l'utilisateur peut voir les billets disponibles pour chaque vol.
Une fois cette liste de billets affichée, l'utilisateur peut alors réserver un ou plusieurs billets. 
Grâce au bouton "Voir mes billets réservés", l'utilisateur peut afficher la liste des billets qu'il a réservés.

Une fois ces actions effectuées, l'utlisateur peut alors se déconnecter.

# Important
Lors de chaque rafraichissement de la page, la page d'inscription/connexion est affichée et il faudra alors que l'utilisateur se reconnecte.

