 <?php
    //======================================================================
    // INDEX.PHP       TP - Prog distribuee       GROUPE - WestCoast
    //======================================================================
?>



<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8"/>
        <title>WestCoast</title>
        <meta http-equiv="Content-Script-Type" content = "application /javascript" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type="application/javascript" src="js/script.js"></script>
        <link href="Css/style.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>

    <body >        
        <!-- Création du bloc d'en-tête: le logo et un slogan -->
        <header class="wrapperR">
            <h1 id="headerRight">West Coast</h1>
            <div class="button_cont" align="center"><input type="submit" class="example_c" value="Panier" id="Panier"></div>
            <div class="button_rev" align="center"><input type="submit" class="example_c" value="Boutique" id="Boutique"></div>
        </header>

        <!-- Affichage des billets -->
        <section id="section_billets">
            <span id="billets">
            </span>
        </section>

        <!-- Affichage du panier -->
        <section id="section_achats">
            <span id="billets">
            </span>
        </section>
    </body>
</html>
