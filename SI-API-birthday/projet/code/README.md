# Mise en place
Avant de pouvoir éxécuter notre projet, il vous faudra importer notre base de donnée et installer quelque application nécessaire.

## Base de donnée
Démarrez votre server local et ouvrez votre gestionnaire de base de donnée favoris. Dans cette exemple nous utilisont WampServer pour gérer notre serveur Apache et notre gestionnaire phpMyAdmin.
Si vous n'en avez pas, je vous conseille d'installer WampServer qui comprendre le serveur, le gestionnaire ainsi que les dernières versions de PHP.

Voici la suite d'action à effectuer:
- Sur phpMyAdmin, ajouter un utilisateur "api_birthday_user@localhost" avec le mdp suivant "4P1_B1rthd4y" en lui accordant tous les droits de donnée et de structure ainsi que le droit de process
- Créer une nouvelle base de donnée nommée "api_birthday"
- Importer les tables et les données grâce au fichier "api_birthday.sql" disponible dans le fichier "code"

C'est bon! Votre base de données est prête!

## Composer
Vous aurez aussi besoin de l'application Composer pour faire fonctionner tout ça:
- Installer Composer
- Récupérer le fichier "composer.phar" généré lors de l'installation et copier le dans le fichier "code"
- Ouvrir une fenetre "Git Bash" a partir du fichier "code" et taper la commande suivante "php composer.phar install"
- A la fin de l'installation, démarrer le serveur via la commande "php bin/console server:run"
- Afficher le site en tapant "localhost:8000" dans votre navigateur de recherche