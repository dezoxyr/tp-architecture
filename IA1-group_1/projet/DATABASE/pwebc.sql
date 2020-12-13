-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Dim 13 Décembre 2020 à 20:36
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pwebc`
--

-- --------------------------------------------------------

--
-- Structure de la table `aeroports`
--

CREATE TABLE `aeroports` (
  `ID` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Ville` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `aeroports`
--

INSERT INTO `aeroports` (`ID`, `Nom`, `Ville`) VALUES
(1, 'CDG', 'Paris'),
(2, 'JFK', 'New York'),
(3, 'DTW', 'Detroit');

-- --------------------------------------------------------

--
-- Structure de la table `compagnies`
--

CREATE TABLE `compagnies` (
  `ID` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `compagnies`
--

INSERT INTO `compagnies` (`ID`, `Nom`) VALUES
(2, 'Air Canada'),
(1, 'Air France'),
(4, 'American Airlines'),
(5, 'Easy Jet'),
(3, 'Fly Emirates');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `vol` int(11) NOT NULL,
  `personne` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `reservations`
--

INSERT INTO `reservations` (`vol`, `personne`) VALUES
(1, 35),
(1, 37),
(2, 37),
(2, 38),
(3, 35),
(3, 37),
(4, 35),
(4, 37),
(4, 38),
(5, 35),
(6, 37);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `joining_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_pass`, `joining_date`) VALUES
(35, 'kanza', 'kanza@gmail.com', '$2y$10$gz/gTzBiuf9tPx0KxOIDCetrCNOnKwECNQzuLC4jaKEhS9Dx3i3PW', '2020-12-11 10:07:09'),
(38, 'MonsieurTest', 'test@gmail.com', '$2y$10$utT2NeNFJAvqf9hPslarVOMkIVcqeTdct6wRmIOfFytvLEMB8vJT6', '2020-12-13 19:56:43'),
(37, 'guigui2', 'nespoulous2@et.esiea.fr', '$2y$10$m79b5tNTR8dz2Sn7nO0Pke4DaT0g27xzoT1lHLmA03VsCJv/q8uF2', '2020-12-12 01:24:25');

-- --------------------------------------------------------

--
-- Structure de la table `vols`
--

CREATE TABLE `vols` (
  `ID` int(11) NOT NULL,
  `Date_depart` date NOT NULL,
  `Compagnie` varchar(50) NOT NULL,
  `Depart` varchar(50) NOT NULL,
  `Arrivee` varchar(50) NOT NULL,
  `Capacite` int(11) NOT NULL,
  `Prix` float NOT NULL,
  `Temps_de_vol` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `vols`
--

INSERT INTO `vols` (`ID`, `Date_depart`, `Compagnie`, `Depart`, `Arrivee`, `Capacite`, `Prix`, `Temps_de_vol`) VALUES
(1, '2020-12-14', 'Air Canada', 'New York', 'Detroit', 200, 50, 1),
(2, '2020-12-14', 'Air France', 'Paris', 'New York', 200, 200, 6),
(3, '2020-12-15', 'Fly Emirates', 'Detroit', 'New York', 200, 50, 1),
(4, '2020-12-16', 'American Airlines', 'Paris', 'New York', 200, 250, 6),
(5, '2020-12-26', 'Easy Jet', 'Detroit', 'Paris', 200, 150, 5),
(6, '2021-01-02', 'Easy Jet', 'New York', 'Detroit', 200, 100, 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `aeroports`
--
ALTER TABLE `aeroports`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Nom` (`Nom`);

--
-- Index pour la table `compagnies`
--
ALTER TABLE `compagnies`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Nom` (`Nom`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`vol`,`personne`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `vols`
--
ALTER TABLE `vols`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `aeroports`
--
ALTER TABLE `aeroports`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `compagnies`
--
ALTER TABLE `compagnies`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT pour la table `vols`
--
ALTER TABLE `vols`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
