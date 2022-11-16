-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.10-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- grant all privileges on *.* to 'admin'@'*';

-- Volcando estructura de base de datos para kodoti_wallet
CREATE DATABASE IF NOT EXISTS `shopping-cart` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `shopping-cart`;

-- Volcando estructura para tabla kodoti_wallet.auth_user
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(15) NOT NULL,
  `client_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  CONSTRAINT `fk_client_id` FOREIGN KEY (`client_id`)
  REFERENCES `clients` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla kodoti_wallet.wallet_balance
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`)
  REFERENCES `items` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla kodoti_wallet.wallet_movement
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `id_number` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `id_number` (`id_number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla kodoti_wallet.wallet_subscription
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(10) NOT NULL,
  `barcode` varchar(150) NOT NULL,
  `name` varchar(200) NOT NULL,
  `item_number` varchar(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_number` (`item_number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


-- Default user
-- INSERT INTO `auth_user` (`email`, `password`, `created_at`, `updated_at`) VALUES
-- 	('caprilespe@outlook.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', '2020-07-09 00:36:13', NULL);

INSERT IGNORE INTO clients 
  (username, name, lastname, id_number) 
VALUES 
  ("zearkiatos", "Pedro", "Capriles", "12345678");

INSERT IGNORE INTO items 
  (sku, barcode, item_number, name, price) 
VALUES 
  ("11111", "111111111111", "11111", "Item 1", 200.0);

INSERT IGNORE INTO items 
  (sku, barcode, item_number, name, price) 
VALUES 
  ("22222", "222222222222", "22222", "Item 2", 100.0);

INSERT IGNORE INTO items 
  (sku, barcode, item_number, name, price) 
VALUES
   ("33333", "333333333333", "33333","Item 3", 125.25);