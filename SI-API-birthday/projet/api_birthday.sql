-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 02 déc. 2020 à 10:44
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_birthday`
--

-- --------------------------------------------------------

--
-- Structure de la table `aeroport`
--

DROP TABLE IF EXISTS `aeroport`;
CREATE TABLE IF NOT EXISTS `aeroport` (
  `A_code` varchar(50) NOT NULL,
  `A_nom` varchar(50) NOT NULL,
  `A_id_ville` int(11) NOT NULL,
  PRIMARY KEY (`A_code`),
  KEY `A_id_ville` (`A_id_ville`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `billet`
--

DROP TABLE IF EXISTS `billet`;
CREATE TABLE IF NOT EXISTS `billet` (
  `B_id` int(11) NOT NULL,
  `B_code_depart` varchar(50) NOT NULL,
  `B_code_arriver` varchar(50) NOT NULL,
  `B_reserver` tinyint(1) NOT NULL,
  PRIMARY KEY (`B_id`),
  KEY `B_code_depart` (`B_code_depart`),
  KEY `B_code_arriver` (`B_code_arriver`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `C_id` int(11) NOT NULL,
  `C_nom` varchar(50) NOT NULL,
  `C_prenom` varchar(50) NOT NULL,
  `C_mail` varchar(50) NOT NULL,
  `C_hash` varchar(50) NOT NULL,
  `C_empreinte` varchar(50) NOT NULL,
  PRIMARY KEY (`C_id`),
  UNIQUE KEY `C_mail` (`C_mail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

DROP TABLE IF EXISTS `pays`;
CREATE TABLE IF NOT EXISTS `pays` (
  `P_id` int(11) NOT NULL,
  `P_nom` varchar(50) NOT NULL,
  PRIMARY KEY (`P_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `reserver`
--

DROP TABLE IF EXISTS `reserver`;
CREATE TABLE IF NOT EXISTS `reserver` (
  `R_id_billet` int(11) NOT NULL,
  `R_id_client` int(11) NOT NULL,
  `R_date` datetime NOT NULL,
  PRIMARY KEY (`R_id_billet`,`R_id_client`),
  KEY `R_id_client` (`R_id_client`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

DROP TABLE IF EXISTS `ville`;
CREATE TABLE IF NOT EXISTS `ville` (
  `V_id` int(11) NOT NULL,
  `V_nom` varchar(50) NOT NULL,
  `V_id_pays` int(11) NOT NULL,
  PRIMARY KEY (`V_id`),
  KEY `V_id_pays` (`V_id_pays`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
