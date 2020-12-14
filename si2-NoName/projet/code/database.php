<?php
class database
{
    
    private $listeVol;
    private $listeReserv;

    function __construct() {

        $content = json_decode(file_get_contents('./database.json'), true);
        $this->listeVol = $content[0];
        $this->listeReserv = $content[1];

    }

    function getListVol(){
        return $this->listeVol;
    }

    function reservation($id, $client){
        if($this->listeVol[$id]){
            $this->listeReserv[strtolower($client['nom'].$client['prenom'])][] = array(
                        'client' => $client,
                        'vol' => $this->listeVol[$id]
                    );

            $this->listeVol[$id]['place']--;


            $content = array($this->listeVol, $this->listeReserv);
            file_put_contents("./database.json", json_encode($content));

            return array(
                'client' => $client,
                'vol' => $this->listeVol[$id]
            );
        }else{
            return null;
        }
        
    }

    function getReservation($client){
        return (array_key_exists(strtolower($client['nom'].$client['prenom']), $this->listeReserv)? $this->listeReserv[strtolower($client['nom'].$client['prenom'])] : [] );
    }
}
?>
