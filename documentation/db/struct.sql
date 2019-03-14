-- -------------------------------------------------------------
-- Database: akrobat
-- Generation Time: 2019-03-13 5:25:59.4790 PM
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `AchievedCircuits` (
  `id_route` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) DEFAULT NULL,
  `max_score` int(11) DEFAULT NULL,
  `statut_circuit` enum('0','1','2') DEFAULT NULL,
  `version` tinyint(4) DEFAULT NULL,
  `achievedDate` datetime DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_circuit` int(11) DEFAULT NULL,
  `id_step` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_route`),
  KEY `id_user` (`id_user`),
  KEY `id_circuit` (`id_circuit`),
  KEY `id_step` (`id_step`),
  CONSTRAINT `AchievedCircuits_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AchievedCircuits_ibfk_2` FOREIGN KEY (`id_circuit`) REFERENCES `Circuits` (`id_circuit`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AchievedCircuits_ibfk_3` FOREIGN KEY (`id_step`) REFERENCES `Steps` (`id_step`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Circuits` (
  `id_circuit` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `length` float DEFAULT NULL,
  `duration` datetime DEFAULT NULL,
  `need_internet` tinyint(1) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `version` tinyint(4) DEFAULT NULL,
  `level` enum('0','1','2') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_circuit`),
  UNIQUE KEY `name` (`name`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `Circuits_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

CREATE TABLE `Evaluations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `stars` tinyint(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_circuit` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_circuit` (`id_circuit`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `Evaluations_ibfk_1` FOREIGN KEY (`id_circuit`) REFERENCES `Circuits` (`id_circuit`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Evaluations_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `Questions` (
  `id_question` int(11) NOT NULL AUTO_INCREMENT,
  `wording` text,
  `response` text,
  `type_of` tinyint(4) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `id_step` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_question`),
  KEY `id_step` (`id_step`),
  CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`id_step`) REFERENCES `Steps` (`id_step`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

CREATE TABLE `Relations` (
  `status` enum('0','1','2') NOT NULL,
  `UserIdUser` int(11) NOT NULL,
  `RelationIdUser` int(11) NOT NULL,
  PRIMARY KEY (`UserIdUser`,`RelationIdUser`),
  KEY `RelationIdUser` (`RelationIdUser`),
  CONSTRAINT `Relations_ibfk_1` FOREIGN KEY (`UserIdUser`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Relations_ibfk_2` FOREIGN KEY (`RelationIdUser`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Steps` (
  `id_step` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `description` text,
  `order` int(11) DEFAULT NULL,
  `instruction` varchar(255) DEFAULT NULL,
  `validation` varchar(255) DEFAULT NULL,
  `id_circuit` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_step`),
  KEY `id_circuit` (`id_circuit`),
  CONSTRAINT `Steps_ibfk_1` FOREIGN KEY (`id_circuit`) REFERENCES `Circuits` (`id_circuit`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=latin1;

CREATE TABLE `Users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;