<?php
class database
{
    // déclaration d'une propriété
    private $listeVol;
    private $listeReserv;

    // déclaration des méthodes
    function __construct() {
        $this->listeVol = array(
            1 => array(
                'departPlace' => 'JFK',
                'arrivePlace' => 'CDG',
                'dateDepart' => '2020-08-19 14:55',
                'dateArrive' => '2020-08-19 23:14',
                'prix' => 400,
                'code' => 'JFK-CDG 400' ),
            2 => array(
                'departPlace' => 'CDG',
                'arrivePlace' => 'JFK',
                'dateDepart' => '2020-08-20 13:55',
                'dateArrive' => '2020-08-20 22:14',
                'prix' => 250,
                'code' => 'CDG-JFK 250' ),
            3 => array(
                'departPlace' => 'DTW',
                'arrivePlace' => 'CDG',
                'dateDepart' => '2020-10-10 10:02',
                'dateArrive' => '2020-10-10 18:52',
                'prix' => 300,
                'code' => 'DTW-CDG 300' ),
            4 => array(
                'departPlace' => 'CDG',
                'arrivePlace' => 'DTW',
                'dateDepart' => '2020-10-11 14:05',
                'dateArrive' => '2020-10-11 22:55',
                'prix' => 600,
                'code' => 'CDG-DTW 600' )
            );

        $this->listeReserv = array(
            "dupondjean" => array(
                1 => array(
                    'client' => array(
                        'nom' => 'dupond',
                        'prenom' => 'jean'
                    ),
                    'vol' => array(
                        'departPlace' => 'DTW',
                        'arrivePlace' => 'CDG',
                        'dateDepart' => '2020-10-10 10:02',
                        'dateArrive' => '2020-10-10 18:52',
                        'prix' => 300,
                        'code' => 'DTW-CDG 300' 
                    )
                ),
                2 => array(
                    'client' => array(
                        'nom' => 'dupond',
                        'prenom' => 'jean'
                    ),
                    'vol' => array(
                        'departPlace' => 'CDG',
                        'arrivePlace' => 'DTW',
                        'dateDepart' => '2020-10-11 14:05',
                        'dateArrive' => '2020-10-11 22:55',
                        'prix' => 600,
                        'code' => 'CDG-DTW 600' 
                    )
                )
            ),
            "etchebestphilippe" => array(
                1 => array(
                    'client' => array(
                        'nom' => 'etchebest',
                        'prenom' => 'philippe'
                    ),
                    'vol' => array(
                        'departPlace' => 'JFK',
                        'arrivePlace' => 'CDG',
                        'dateDepart' => '2020-08-19 14:55',
                        'dateArrive' => '2020-08-19 23:14',
                        'prix' => 400,
                        'code' => 'JFK-CDG 400' 
                    )
                ),
                2 => array(
                    'client' => array(
                        'nom' => 'dupond',
                        'prenom' => 'jean'
                    ),
                    'vol' => array(
                        'departPlace' => 'CDG',
                        'arrivePlace' => 'JFK',
                        'dateDepart' => '2020-08-20 13:55',
                        'dateArrive' => '2020-08-20 22:14',
                        'prix' => 250,
                        'code' => 'CDG-JFK 250' 
                    )
                )
            ),
        );

    }

    function getListVol(){
        return $this->listeVol;
    }

    function reservation($id, $client){
        if($this->listeVol[$id]){
            $this->listeReserv[strtolower($client['nom'].$client['prenom'])] = array(
                        'client' => $client,
                        'vol' => $this->listeVol[$id]
                    );

            return $this->listeReserv[strtolower($client['nom'].$client['prenom'])];
        }else{
            return null;
        }
        
    }

    function getReservation($client){
        return $this->listeReserv[strtolower($client['nom'].$client['prenom'])];
    }
}
?>
