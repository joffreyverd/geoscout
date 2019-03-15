-- -------------------------------------------------------------
-- Database: akrobat
-- Generation Time: 2019-03-13 5:40:11.5260 PM
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


INSERT INTO `Users` (`id_user`, `firstname`, `lastname`, `picture`, `email`, `password`) VALUES ('1', 'PICHET', 'Roland', '', 'pichet.roland@caramail.fr', '$2a$12$oUfVka//SY2vtm30aKyjAO1z4R/b6HsldK30k.QTSol.f0WWBU2l.'),
('2', 'Thomas', 'Unterfinger', '', 'thomas-un@hotmail.fr', '$2a$12$tmnNnaFVSDrBkCq2ycNan.iOjXaIAEq39qZYMeADcnnYzwCoZGI52'),
('4', 'Joffrey', 'Verd', NULL, 'jverd@protonmail.com', '$2a$12$QDzF86tCq4yJjlrdsHd38.LZm.RX18TVMoCXXRBKnXBcdu6GYlrqS'),
('5', 'Léon', 'Test', NULL, 'leon@test.fr', '$2a$12$xkHbqfEL4gp7RE7PW7AqrOzZiFVSeQcC4CKhogsQpZWwUVHVLiCe.'),
('10', 'Stevy', 'Palarski', NULL, 'stevy.palarski@gmail.com', '$2a$12$fg7NXXgSeGAqoQenszVNRO.1kyen1sgDwgtO5Ki/R.PwoKRux30r.');

INSERT INTO `Circuits` (`id_circuit`, `name`, `description`, `length`, `duration`, `need_internet`, `published`, `version`, `level`, `createdAt`, `updatedAt`, `id_user`) VALUES ('1', 'Circuit1', 'Un super circuit vous allez voir !', '50', '1970-01-01 02:00:00', '1', '0', '0', X'30', '2019-03-06 23:18:09', '2019-03-06 23:18:09', '1'),
('3', 'Circuit2', 'Un super circuit vous allez voir !', '50', '1970-01-01 02:00:00', '1', '0', '0', X'30', '2019-03-06 23:45:56', '2019-03-06 23:45:56', '1'),
('4', 'Malaga', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 17:10:39', '2019-03-07 17:10:39', '4'),
('5', 'Gibraltar', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 17:19:07', '2019-03-07 17:19:07', '4'),
('6', 'test', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 17:19:44', '2019-03-07 17:19:44', '2'),
('7', 'Londres', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 17:20:50', '2019-03-07 17:20:50', '4'),
('8', 'frgzerg', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 17:22:04', '2019-03-07 17:22:04', '2'),
('20', 'wow', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 22:18:42', '2019-03-07 22:18:42', '2'),
('31', 'SEl', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 23:45:20', '2019-03-07 23:45:20', '2'),
('33', 'Visite du château de Strasbourg', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 23:55:58', '2019-03-07 23:55:58', '10'),
('34', 'vaisselle', 'description', NULL, NULL, NULL, '0', '0', NULL, '2019-03-07 23:56:18', '2019-03-08 02:00:58', '2'),
('36', 'Madrid', 'Circuit de découverte de Madrid', '14', NULL, NULL, '0', '0', NULL, '2019-03-08 09:49:02', '2019-03-08 09:51:37', '4'),
('37', 'Circuit Démo', 'Un chouette circuit de présentation du projet Akrobat', '51', '1970-01-01 02:00:00', NULL, '1', '0', NULL, '2019-03-08 10:00:23', '2019-03-08 10:00:23', '4'),
('38', 'Démo 2', NULL, NULL, NULL, NULL, '0', '0', NULL, '2019-03-08 10:35:22', '2019-03-08 10:35:22', '4');

INSERT INTO `Steps` (`id_step`, `name`, `latitude`, `longitude`, `description`, `order`, `instruction`, `validation`, `id_circuit`) VALUES ('37', 'Etape 7', '48.5546', '7.78687', NULL, '8', NULL, NULL, '1'),
('96', 'Etape 0', '48.5542', '7.77721', NULL, '1', NULL, NULL, '20'),
('105', 'Etape 1', '48.5609', '7.75867', NULL, '2', NULL, NULL, '20'),
('120', 'Etape 2', '48.5699', '7.74786', NULL, '3', NULL, NULL, '20'),
('121', 'Etape 3', '48.566', '7.73876', NULL, '4', NULL, NULL, '20'),
('122', 'Etape 4', '48.5498', '7.74786', NULL, '5', NULL, NULL, '20'),
('123', 'Etape 5', '48.5455', '7.76623', NULL, '6', NULL, NULL, '20'),
('124', 'Etape 6', '48.5498', '7.78408', NULL, '7', NULL, NULL, '20'),
('239', 'Etape 1', '48.5537', '7.77166', NULL, '2', NULL, NULL, '8'),
('240', 'Etape 1', '48.5581', '7.77046', NULL, '2', NULL, NULL, '8'),
('243', 'Etape 0', '48.558', '7.77239', 'test pourquoi pas', '1', '', NULL, '31'),
('244', 'Etape 1', '48.5594', '7.76504', NULL, '2', NULL, NULL, '31'),
('245', 'Etape 2', '48.5511', '7.75542', NULL, '3', NULL, NULL, '31'),
('246', 'Etape 3', '48.5639', '7.75388', NULL, '4', NULL, NULL, '31'),
('325', 'Première Etape', '48.5599', '7.77119', '', '0', '', NULL, '34'),
('330', 'Etape 1', '48.5484', '7.80003', NULL, '1', NULL, NULL, '34'),
('332', 'Etape 1', '48.7529', '8.06845', NULL, '1', NULL, NULL, '33'),
('341', 'Etape 4', '48.5229', '7.74837', NULL, '4', NULL, NULL, '36'),
('343', 'place Saint Nicolas aux Ondes', '48.5815', '7.7622', '', '1', 'Rendez-vous sur la place Saint Nicolas aux Ondes (qui tient son nom d’un ancien couvent).\nPrenez la rue de l’Académie.', NULL, '36'),
('344', 'Etape 2', '48.5056', '7.69769', '', '2', 'Rendez-vous à l’entrée de la Haute École des Arts du Rhin.', NULL, '36'),
('345', 'Etape 3', '48.5085', '7.75816', NULL, '3', NULL, NULL, '36'),
('347', 'Etape 5', '48.5523', '7.66683', NULL, '5', NULL, NULL, '36'),
('349', 'Etape 2', '48.582', '7.75904', 'Haute Ecole des Arts du Rhin', '1', 'Rendez-vous à l’entrée de la Haute École des Arts du Rhin.', NULL, '37'),
('350', 'Etape 3', '48.5819', '7.7562', 'Rue de Zurich', '2', 'Rejoignez l’église Saint Guillaume, puis descendez le quai des Bateliers jusqu’à la rue de Zürich.', NULL, '37'),
('351', 'Etape 4', '48.5803', '7.75315', 'Sainte Madeleine', '3', 'Entrez dans la rue Sainte Madeleine.', NULL, '37'),
('352', 'Etape 5', '48.5803', '7.75514', 'Place Sainte Madeleine', '4', 'Rendez-vous Place Sainte Madeleine.', NULL, '37'),
('353', 'Etape 6', '48.5799', '7.75658', 'Place de Zurich', '5', 'Rendez-vous Place de Zürich.', NULL, '37'),
('354', 'Etape 7', '48.5793', '7.75766', 'Rue du Renard Préchant', '6', 'Rue du Renard Prêchant…', NULL, '37'),
('355', 'Etape 8', '48.5795', '7.75938', 'Fritz/Wurtz', '7', 'Traversez la cour du Brochet et la rue de Zürich puis engagez vous dans la rue Fritz.', NULL, '37');

INSERT INTO `Questions` (`id_question`, `wording`, `response`, `type_of`, `points`, `id_step`) VALUES ('6', 'question première étape', 'réponse première étape', NULL, NULL, '325'),
('10', 'Quel animal inattendu trouve-t-on ici, plus grand que nature, ce qui n’est pas peu dire ?', 'Girafe', NULL, NULL, '344'),
('12', 'Quel animal inattendu trouve-t-on ici, plus grand que nature, ce qui n’est pas peu dire ?', 'Girafe', NULL, NULL, '349'),
('13', 'En quelle année les Zürichois ont-ils eu l’occasion d’honorer leur serment de 1576 ?', '1870', NULL, NULL, '350'),
('14', 'Que signifie Maïkäfer en français ?', NULL, NULL, NULL, '351'),
('15', 'Le seul vestige significatif de la muraille protégeant Strasbourg au Moyen- ge se trouve sur cette place. Un portail Renaissance y a été intégré. En quelle année ?', NULL, NULL, NULL, '352'),
('16', 'Comment appelle-t-on le motif représenté par la clé d’arc de la maison du 12 rue du Renard Prêchant ? (expression latine, 2 mots)', NULL, NULL, NULL, '354'),
('17', 'Les bâtiments des rues Fritz et Wurtz datent principalement de la fin du XIXème siècle avec une vocation fréquente d’habitat social. Trouvez rue Wurtz le titre (français) d’un film sorti, en France, en 1968 (2 mots).', NULL, NULL, NULL, '355');

INSERT INTO `Evaluations` (`id`, `comment`, `stars`, `createdAt`, `updatedAt`, `id_circuit`, `id_user`) VALUES ('1', '10/10 would do it again', '5', '2019-03-06 23:43:32', '2019-03-06 23:43:32', '1', '1'),
('2', '10/10 would do it again', '5', '2019-03-06 23:43:54', '2019-03-06 23:43:54', '1', '1');


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;