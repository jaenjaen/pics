-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pics
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pics
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pics` DEFAULT CHARACTER SET utf8 ;
USE `pics` ;
-- -----------------------------------------------------
-- Drop Table `pics`
-- -----------------------------------------------------
SET @tables = NULL;
SELECT GROUP_CONCAT(table_schema, '.', table_name) INTO @tables
  FROM information_schema.tables
  WHERE table_schema = 'pics'; -- specify DB name here.

SET @tables = CONCAT('DROP TABLE ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- -----------------------------------------------------
-- Table `pics`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`company` (
  `com_id` VARCHAR(45) NOT NULL COMMENT 'email',
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `password` VARCHAR(45) NOT NULL,
  `tel` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(500) NULL,
  `logo_img` VARCHAR(45) NULL,
  PRIMARY KEY (`com_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`loginAPI`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`loginAPI` (
  `api_id` INT NOT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`api_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`customer` (
  `cust_id` INT NOT NULL AUTO_INCREMENT,
  `api_id` INT NOT NULL,
  `gender` CHAR(5) NULL,
  `age` INT NULL,
  `job` VARCHAR(45) NULL,
  `funnel` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `tel` VARCHAR(45) NOT NULL,
  `api_key` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`cust_id`),
  INDEX `fk_customer_loginAPI1_idx` (`api_id` ASC) VISIBLE,
  CONSTRAINT `fk_customer_loginAPI1`
    FOREIGN KEY (`api_id`)
    REFERENCES `pics`.`loginAPI` (`api_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`studio_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`studio_category` (
  `category_id` INT NOT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`studio_filter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`studio_filter` (
  `filter_id` INT NOT NULL AUTO_INCREMENT,
  `area` DOUBLE NULL,
  `option` VARCHAR(200) NULL,
  `parking` INT NULL,
  `unit_price` INT NULL,
  `default_capacity` INT NULL,
  `excharge` INT NULL,
  `address` VARCHAR(45) NULL,
  `max_capacity` INT NULL,
  PRIMARY KEY (`filter_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`studio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`studio` (
  `stu_id` INT NOT NULL AUTO_INCREMENT,
  `com_id` VARCHAR(45) NOT NULL,
  `category_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `desc` VARCHAR(45) NULL,
  `rule` VARCHAR(400) NULL,
  `filter_id` INT NOT NULL,
  `main_img` VARCHAR(400) NULL,
  `port_img` VARCHAR(400) NULL,
  `cad_img` VARCHAR(45) NULL,
  `floor` INT NULL,
  PRIMARY KEY (`stu_id`),
  INDEX `fk_studio_company1_idx` (`com_id` ASC) VISIBLE,
  INDEX `fk_studio_studio_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_studio_studio_filter1_idx` (`filter_id` ASC) VISIBLE,
  CONSTRAINT `fk_studio_company1`
    FOREIGN KEY (`com_id`)
    REFERENCES `pics`.`company` (`com_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_studio_studio_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `pics`.`studio_category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_studio_studio_filter1`
    FOREIGN KEY (`filter_id`)
    REFERENCES `pics`.`studio_filter` (`filter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`review` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `cust_id` INT NOT NULL,
  `stu_id` INT NOT NULL,
  `score` INT NULL,
  `content` VARCHAR(200) NULL,
  `img` VARCHAR(45) NULL,
  `reg_date` VARCHAR(45) NULL,
  `answer` VARCHAR(200) NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_review_customer1_idx` (`cust_id` ASC) VISIBLE,
  INDEX `fk_review_studio1_idx` (`stu_id` ASC) VISIBLE,
  CONSTRAINT `fk_review_customer1`
    FOREIGN KEY (`cust_id`)
    REFERENCES `pics`.`customer` (`cust_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `pics`.`studio` (`stu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`bookmark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`bookmark` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `stu_id` INT NOT NULL,
  `cust_id` INT NOT NULL,
  PRIMARY KEY (`book_id`),
  INDEX `fk_bookmark_studio1_idx` (`stu_id` ASC) VISIBLE,
  INDEX `fk_bookmark_customer1_idx` (`cust_id` ASC) VISIBLE,
  CONSTRAINT `fk_bookmark_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `pics`.`studio` (`stu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmark_customer1`
    FOREIGN KEY (`cust_id`)
    REFERENCES `pics`.`customer` (`cust_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`chat` (
  `chat_id` INT NOT NULL AUTO_INCREMENT,
  `cust_id` INT NOT NULL,
  `word` VARCHAR(200) NULL,
  `date_time` DATETIME NULL,
  `stu_id` INT NOT NULL,
  `sender` INT NULL,
  PRIMARY KEY (`chat_id`),
  INDEX `fk_chat_customer1_idx` (`cust_id` ASC) VISIBLE,
  INDEX `fk_chat_studio1_idx` (`stu_id` ASC) VISIBLE,
  CONSTRAINT `fk_chat_customer1`
    FOREIGN KEY (`cust_id`)
    REFERENCES `pics`.`customer` (`cust_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `pics`.`studio` (`stu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`reservation` (
  `res_id` INT NOT NULL AUTO_INCREMENT,
  `cust_id` INT NOT NULL,
  `stu_id` INT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `total_price` INT NOT NULL,
  `res_date` DATETIME NOT NULL,
  `total_people` INT NOT NULL,
  INDEX `fk_reservation_customer1_idx` (`cust_id` ASC) VISIBLE,
  INDEX `fk_reservation_studio1_idx` (`stu_id` ASC) VISIBLE,
  PRIMARY KEY (`res_id`),
  CONSTRAINT `fk_reservation_customer1`
    FOREIGN KEY (`cust_id`)
    REFERENCES `pics`.`customer` (`cust_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservation_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `pics`.`studio` (`stu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`repeat_date`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`repeat_date` (
  `repeat_id` INT NOT NULL AUTO_INCREMENT,
  `weekday` VARCHAR(45) NULL,
  `time` VARCHAR(45) NULL,
  `stu_id` INT NOT NULL,
  PRIMARY KEY (`repeat_id`),
  INDEX `fk_repeat_date_studio1_idx` (`stu_id` ASC) VISIBLE,
  CONSTRAINT `fk_repeat_date_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `pics`.`studio` (`stu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`exception_date`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`exception_date` (
  `exception_id` INT NOT NULL AUTO_INCREMENT,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `stu_id` INT NOT NULL,
  PRIMARY KEY (`exception_id`),
  INDEX `fk_holiday_studio1_idx` (`stu_id` ASC) VISIBLE,
  CONSTRAINT `fk_holiday_studio1`
    FOREIGN KEY (`stu_id`)
    REFERENCES `pics`.`studio` (`stu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pics`.`tag_dic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pics`.`tag_dic` (
  `tag_dic_id` INT NOT NULL,
  `tag` VARCHAR(45) NULL,
  `filter_id` INT NOT NULL,
  PRIMARY KEY (`tag_dic_id`),
  INDEX `fk_tag_dic_studio_filter1_idx` (`filter_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_dic_studio_filter1`
    FOREIGN KEY (`filter_id`)
    REFERENCES `pics`.`studio_filter` (`filter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
