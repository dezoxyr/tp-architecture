Groupe : Les nuls 
Prodhomme Romaric  et  Revault d'allonnes Hugo 
Languages de programmation:  PYTHON, HTML/ CSS, jQuery
Architecture 3 tiers

BASE DE DONNNES:
	Vol : 
   		id
   		code_depart
   		code_arrive
   		prix

API:

Programmation Python, utilisation Flask
Utilsation HTTP
	GET fly --> retourne la liste des vols
	GET fly id --> retourne 1 vol en particulier
	PUT fly id --> met un vol dans le panier
	DELETE fly id --> retire un vol du panier

FRONTEND:

Interface web en HTML/CSS/jQuery

	3 Boutons principaux ( afficher vols, Reserver un Vol , afficher Panier ) 
	On appelle une methode différente avec onclick() sur chaque bouton 
	
	
	Afficher vols ( Affichage simple des vols stockés en dur )
	
	Reserver un vol ( 1 bouton a coté de chaque vol proposé par la compagnie qui donne la possibilité de l'acheter )
		Le panier sera stocké à l'aide de jQuery en dur. 
	
	Afficher panier ( 1 bouton a coté de chaque vol dans le panier pour pouvoir le supprimer )
		Le panier sera affiché à l'aide de jQuery.

	






