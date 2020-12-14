<?php


namespace App;

Class Billet 
{
	public $_id;
	public $_CodeDepart;
	public $_CodeArriver;
	public $_Prix;


	
	public function __construct($_id,$_CodeDepart,$_CodeArriver,$_Prix)
	{
		$this->setId($_id);
		$this->setCodeDepart($_CodeDepart);
		$this->setCodeArriver($_CodeArriver);
		$this->setPrix($_Prix);
	}

	public function getId()
	{
		return $this->_id;
	}

	public function getCodeDepart()
	{
		return $this->_CodeDepart;
	}

	public function getCodeArriver()
	{
		return $this->_CodeArriver;
	}

	public function getPrix()
	{
		return $this->_Prix;
	}

	public function setId($_id)
	{
		return $this->_id = $_id;
	}

	public function setCodeDepart($_CodeDepart)
	{
		$this->_CodeDepart = $_CodeDepart;
	}


	public function setCodeArriver($_CodeArriver)
	{
		$this->_CodeArriver = $_CodeArriver;
	}

	public function setPrix($_Prix)
	{
		$this->_Prix = $_Prix;
	}
}







?>