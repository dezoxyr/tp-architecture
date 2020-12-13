# Groupe : Les nuls 

**Prodhomme** Romaric  et  **Revault d'Allonnes** Hugo 

Langages de programmation:  *PYTHON* , *HTML / CSS* , *jQuery* , *Javascript*

## Architecture 3 tiers 

### 1. Coté Client :
* HTML / CSS
* Javascript
* Jquery


> 3 Boutons principaux ( afficher vols, Reserver un Vol , afficher Panier ) ---> On appelle une methode différente avec onclick() sur chaque bouton :
> > * Afficher vols ( Affichage simple des vols stockés en dur )w
> > * Reserver un vol ( 1 bouton a coté de chaque vol proposé par la compagnie qui donne la possibilité de l'acheter )
> >   Le panier sera stocké à l'aide de jQuery en dur. 	
> > * Afficher panier ( 1 bouton a coté de chaque vol dans le panier pour pouvoir le supprimer )
> >   Le panier sera affiché à l'aide de jQuery.



### 2. Application :
* Python
* Flasks


> Utilsation des méthode pour récupérer les "informations" à l'aide notre API
> > * GET fly --> retourne la liste des vols
> > * GET fly id --> retourne 1 vol en particulier
> > * PUT fly id --> met un vol dans le panier
> > * DELETE fly id --> retire un vol du panier

### 3. Stockage de données :
* Stockage des données ''in mémory'' 
* Utilisation d'un réelle BDD pas utile ici 
* Format JSON utilisé

> Vol : 
> > * id
> > * code_depart
> > * code_arrive
> > * prix