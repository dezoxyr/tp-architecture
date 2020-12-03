                                  **PROGRAMMATION DISTRIBUEE**
    
                            # Site de réservation de billets  d'avion #


# Objectifs du site #

- Visualiser la liste des vols disponibles
- Réserver un vol
- Visualiser la réservation effectuée


# Architecture globale #

1/

    Utilisateur   ------->     Site de réservation   -------->    Mémoire : Local Storage 
                  <--------                          <--------    

2/

Page 1 

        Accueil
    
        Recherche vols

Page 2  

        Affichage réservation



# Modèle de données #

| Utilisateur          |             Réserve                    |               Vol               |
| ---------------------|--------------------------------------- |---------------------------------|
| Nom                  |             Référence                  |          Aéroport de départ     |
| Prénom.              |                                        |          Aéroport d'arrivée     |
| Date de naissance    |                                        |            Prix                 |
| Adresse              |                                        |                                 |
|                      |                                        |                                 |
|                      |                                        |                                 |
|                      |                                        |                                 |
|______________________|________________________________________|_________________________________|
                    ----->                                    ----->


# Le stack technique utilisé #

Liste de tous les outils technologiques utilisés pour développer et faire fonctionner le site de réservation :




        FRONT END :                       BACK END :                   BASES DE DONNEES :
       -----------                      -------------                  ----------------
     
          HTML                           JAVA SCRIPT                      API JSON 
    
          CSS
    
    FRAMEWORK BOOTSTRAP
    
     PLUGING FLEXSLIDER








