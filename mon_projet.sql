-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 16 août 2026 à 21:00
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mon_projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `declarations`
--

CREATE TABLE `declarations` (
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL,
  `area` varchar(100) NOT NULL,
  `departement` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `equipement` varchar(100) NOT NULL,
  `reason` text NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `target Hours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `declarations`
--

INSERT INTO `declarations` (`date`, `id`, `area`, `departement`, `description`, `equipement`, `reason`, `start`, `end`, `target Hours`) VALUES
('2026-08-14 19:44:51', 1, 'ZONE1', 'MAINTENANCE', 'TEST', 'CONVOYEUR 12', 'TEST', '03:02:00', '04:00:00', 3),
('2026-08-14 19:44:51', 2, 'ZONE 2', 'MAINTENANCE', 'TEST', 'CONVOYEUR 2', 'TEST', '03:02:00', '07:00:00', 3),
('2026-08-14 19:44:51', 3, 'ZONE 3', 'MAINTENANCE', 'TEST', 'CONVOYEUR 4', 'TST', '02:00:00', '03:00:00', 12),
('2026-08-14 19:44:51', 4, 'zone 12', 'MAINTENANCE', 'TEST', 'CONVOYEUR 23', 'TEST', '03:03:00', '05:00:00', 23),
('2026-08-14 19:44:51', 5, 'ZONE 3', 'MAINTENANCE', 'TEST', 'CONVOYEUR 22', 'TEST', '02:00:00', '03:00:00', 22),
('2026-08-14 19:44:51', 6, 'zone2', 'MAINTENANCE', 'TEST', 'CONVOYEUR 234', 'TEST', '01:00:00', '02:00:00', 23),
('2026-08-14 19:44:51', 7, 'zone 1', 'maintenance', 'test', 'convoyeur14', 'test', '01:00:00', '03:00:00', 10),
('2026-08-14 20:29:55', 8, 'zone1324', 'MAINTENANCE', 'TEST', 'CONVOYEUR 12', 'TEST', '01:00:00', '02:00:00', 132),
('2026-08-14 20:30:47', 9, 'zone 0', 'maintenance', 'test', 'convoyeur 33', 'test', '02:00:00', '03:00:00', 98),
('2026-08-16 00:00:00', 10, 'zone1', 'maitenance', 'TEST', 'convoyeur 1', 'TEST', '01:00:00', '02:00:00', 2),
('2026-08-16 00:00:00', 11, 'zone1', 'maintenance', 'test', 'convoyeur 1', 'test', '01:00:00', '02:00:00', 12),
('2026-08-16 00:00:00', 12, 'ZONE1', 'maintenance', 'TEST', 'convoyeur 1', 'TEST', '01:00:00', '02:00:00', 12),
('2026-08-16 00:00:00', 13, 'ZONE 1', 'MAINTENANCE', 'TEST', 'CONVOUER 22', 'TEST', '01:00:00', '02:00:00', 23),
('2026-08-16 00:00:00', 14, 'ZONE3', 'MAINTENANCE', 'TEST', 'CONVOYEUR2', 'TEST', '02:00:00', '01:00:00', 3),
('2026-08-16 00:00:00', 15, 'ZONE2', 'MAINTENANCE', 'TEST', 'CONVOYEUR2', 'TEST', '01:00:00', '02:00:00', 2),
('2026-08-16 00:00:00', 16, 'ZONE 1', 'MAINTENANCE', 'TEST', 'CONVOYEUR 3', 'TEST', '04:00:00', '04:04:00', 23),
('2026-08-16 00:00:00', 17, 'ZONE3', 'MAINTENANCE', 'TEST', 'CONVOYEUR 2', 'TSET', '02:00:00', '03:00:00', 2),
('2026-08-16 00:00:00', 18, 'ZONE3', 'MINTENANCE', 'TEST', 'CONVOYEUR3', 'TEST', '03:00:00', '04:00:00', 4),
('2026-08-16 00:00:00', 19, 'ZONE 2', 'MAINTENANCE', 'TEST', 'CONVOYEUR 2', 'TSET', '02:00:00', '03:00:00', 2),
('2026-08-16 00:00:00', 20, 'ZONE 3', 'MAINTENANCE', 'TEST', 'CONVOYEUR 4', 'TEST', '01:00:00', '03:00:00', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `declarations`
--
ALTER TABLE `declarations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `declarations`
--
ALTER TABLE `declarations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
