<?php


namespace App;

Class Utilisateur 
{
	public $_id;
	public $_email;
	public $_reservation = array();
	
	public function __construct($_id,$_email)
	{
		$this->setId($_id);
		$this->setEmail($_email);
		//$this->_reservation = array();
		
	}

	public function getId()
	{
		return $this->_id;
	}

	public function getEmail()
	{
		return $this->_email;
	}

	public function getReservation(){
		return $this->_reservation;
	}

	public function setId($_id)
	{
		return $this->_id = $_id;
	}

	public function setEmail($_email)
	{
		$this->_email = $_email;
	}

	public function setReservation($_billet)
	{
		array_push($this->_reservation, $_billet);
	}

}







?>