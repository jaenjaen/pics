-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: pics
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `stu_id` int NOT NULL,
  `cust_id` int NOT NULL,
  PRIMARY KEY (`book_id`),
  KEY `fk_bookmark_studio1_idx` (`stu_id`),
  KEY `fk_bookmark_customer1_idx` (`cust_id`),
  CONSTRAINT `fk_bookmark_customer1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bookmark_studio1` FOREIGN KEY (`stu_id`) REFERENCES `studio` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `cust_id` int NOT NULL,
  `word` varchar(200) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `stu_id` int NOT NULL,
  `sender` int DEFAULT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `fk_chat_customer1_idx` (`cust_id`),
  KEY `fk_chat_studio1_idx` (`stu_id`),
  CONSTRAINT `fk_chat_customer1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_chat_studio1` FOREIGN KEY (`stu_id`) REFERENCES `studio` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `com_id` varchar(45) NOT NULL COMMENT 'email',
  `name` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `logo_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `cust_id` int NOT NULL AUTO_INCREMENT,
  `api_id` int NOT NULL,
  `gender` char(5) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `job` varchar(45) DEFAULT NULL,
  `funnel` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `api_key` varchar(400) NOT NULL,
  `img_src` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cust_id`),
  KEY `fk_customer_loginAPI1_idx` (`api_id`),
  CONSTRAINT `fk_customer_loginAPI1` FOREIGN KEY (`api_id`) REFERENCES `loginapi` (`api_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exception_date`
--

DROP TABLE IF EXISTS `exception_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exception_date` (
  `exception_id` int NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `stu_id` int NOT NULL,
  PRIMARY KEY (`exception_id`),
  KEY `fk_holiday_studio1_idx` (`stu_id`),
  CONSTRAINT `fk_holiday_studio1` FOREIGN KEY (`stu_id`) REFERENCES `studio` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exception_date`
--

LOCK TABLES `exception_date` WRITE;
/*!40000 ALTER TABLE `exception_date` DISABLE KEYS */;
/*!40000 ALTER TABLE `exception_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loginapi`
--

DROP TABLE IF EXISTS `loginapi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginapi` (
  `api_id` int NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`api_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loginapi`
--

LOCK TABLES `loginapi` WRITE;
/*!40000 ALTER TABLE `loginapi` DISABLE KEYS */;
/*!40000 ALTER TABLE `loginapi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repeat_date`
--

DROP TABLE IF EXISTS `repeat_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repeat_date` (
  `repeat_id` int NOT NULL AUTO_INCREMENT,
  `weekday` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `stu_id` int NOT NULL,
  PRIMARY KEY (`repeat_id`),
  KEY `fk_repeat_date_studio1_idx` (`stu_id`),
  CONSTRAINT `fk_repeat_date_studio1` FOREIGN KEY (`stu_id`) REFERENCES `studio` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repeat_date`
--

LOCK TABLES `repeat_date` WRITE;
/*!40000 ALTER TABLE `repeat_date` DISABLE KEYS */;
/*!40000 ALTER TABLE `repeat_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `res_id` int NOT NULL AUTO_INCREMENT,
  `cust_id` int NOT NULL,
  `stu_id` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `total_price` int NOT NULL,
  `res_date` datetime NOT NULL,
  `total_people` int NOT NULL,
  PRIMARY KEY (`res_id`),
  KEY `fk_reservation_customer1_idx` (`cust_id`),
  KEY `fk_reservation_studio1_idx` (`stu_id`),
  CONSTRAINT `fk_reservation_customer1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reservation_studio1` FOREIGN KEY (`stu_id`) REFERENCES `studio` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `cust_id` int NOT NULL,
  `stu_id` int NOT NULL,
  `score` int DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `reg_date` varchar(45) DEFAULT NULL,
  `answer` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `fk_review_customer1_idx` (`cust_id`),
  KEY `fk_review_studio1_idx` (`stu_id`),
  CONSTRAINT `fk_review_customer1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_review_studio1` FOREIGN KEY (`stu_id`) REFERENCES `studio` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studio`
--

DROP TABLE IF EXISTS `studio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studio` (
  `stu_id` int NOT NULL AUTO_INCREMENT,
  `com_id` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `rule` varchar(400) DEFAULT NULL,
  `main_img` varchar(400) DEFAULT NULL,
  `port_img` varchar(400) DEFAULT NULL,
  `cad_img` varchar(45) DEFAULT NULL,
  `floor` int DEFAULT NULL,
  PRIMARY KEY (`stu_id`),
  KEY `fk_studio_company1_idx` (`com_id`),
  KEY `fk_studio_studio_category1_idx` (`category_id`),
  CONSTRAINT `fk_studio_company1` FOREIGN KEY (`com_id`) REFERENCES `company` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studio_studio_category1` FOREIGN KEY (`category_id`) REFERENCES `studio_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studio`
--

LOCK TABLES `studio` WRITE;
/*!40000 ALTER TABLE `studio` DISABLE KEYS */;
/*!40000 ALTER TABLE `studio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studio_category`
--

DROP TABLE IF EXISTS `studio_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studio_category` (
  `category_id` int NOT NULL auto_increment,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studio_category`
--

LOCK TABLES `studio_category` WRITE;
/*!40000 ALTER TABLE `studio_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `studio_category` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `tag`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `tag`; 
CREATE TABLE `tag`(
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `stu_id` INT NOT NULL,
  `tag` VARCHAR(45) NULL,
  PRIMARY KEY (`tag_id`),
  INDEX `fk_tag_studio_idx` (`stu_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_studio`
    FOREIGN KEY (`stu_id`)
    REFERENCES `studio` (`stu_id`)
    ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE = InnoDB;

--
-- Table structure for table `studio_filter`
--

DROP TABLE IF EXISTS `studio_filter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studio_filter` (
  `filter_id` int NOT NULL AUTO_INCREMENT,
  `size` double DEFAULT NULL,
  `options` varchar(200) DEFAULT NULL,
  `parking` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  `default_capacity` int DEFAULT NULL,
  `excharge` int DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `max_capacity` int DEFAULT NULL,
  `stu_id` INT NOT NULL,
  PRIMARY KEY (`filter_id`),
INDEX `fk_studio_filter_studio1_idx` (`stu_id` ASC) VISIBLE,
  CONSTRAINT `fk_studio_filter_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `studio` (`stu_id`)
     ON DELETE CASCADE ON UPDATE CASCADE)
 ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studio_filter`
--

LOCK TABLES `studio_filter` WRITE;
/*!40000 ALTER TABLE `studio_filter` DISABLE KEYS */;
/*!40000 ALTER TABLE `studio_filter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'pics'
--

--
-- Dumping routines for database 'pics'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-20 13:51:22
