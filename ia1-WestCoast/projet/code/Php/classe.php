<?php
class Billet
{
	public $depart;
	public $arrive;
	public $prix;
  public $nbPlace;
	public $indice;

	function __construct($depart, $arrive, $prix, $i, $nbPlace)
   	{
       	$this->depart = $depart;
       	$this->arrive = $arrive;
       	$this->prix = $prix;
    	  $this->indice = $i;
        $this->nbPlace = $nbPlace;
   	}
   	function get_indice()
   	{
    	return $this->indice;
   	}
    function reservationVol()
    {
      $this->nbPlace = $this->nbPlace - 1;
    }
}

class Client
{
	public $nom;
	public $liste_billets = array();

	function __construct($nom)
   	{
       	$this->nom = $nom;
   	}
   	function add_billet($billet)
   	{
       	array_push($this->liste_billets, $billet);
   	}
   	function get_liste()
   	{
       	return $this->liste_billets;
   	}
}

$aeroports = array(
    array(
        'nom' => 'New York',
        'code' => 'JFK'
    ),
    array(
        'nom' => 'CDG Paris',
        'code' => 'CDG'
    ),
    array(
        'nom' => 'Detroit',
        'code' => 'DTW'
    )
);
?>