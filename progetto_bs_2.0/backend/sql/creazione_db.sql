-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `chaletalpi` DEFAULT CHARACTER SET utf8 ;
USE `chaletalpi` ;

-- -----------------------------------------------------
-- Table `chaletalpi`.`camere`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chaletalpi`.`camere` (
  `nomecamera` VARCHAR(45) NOT NULL,
  `postiletto` INT NOT NULL,
  `prezzonotte` INT NOT NULL,
  `descrizione` VARCHAR(45),
  `imgcamera1` VARCHAR(100),
  `imgcamera2` VARCHAR(100),
  `imgcamera3` VARCHAR(100),
  `imgcamera4` VARCHAR(100),
  PRIMARY KEY (`nomecamera`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `chaletalpi`.`utente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chaletalpi`.`utente` (
  `nome` VARCHAR(45) NOT NULL,
  `cognome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `imgutente` VARCHAR(100),
  PRIMARY KEY (`email`) )
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `chaletalpi`.`prenotazione`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chaletalpi`.`prenotazione` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datainizio` DATE,
  `datafine` DATE,
  `prezzo` FLOAT(8),
  `email` VARCHAR(100) NOT NULL,
  `nomecamera` VARCHAR(45) NOT NULL,
  FOREIGN KEY (`nomecamera`) REFERENCES camere (`nomecamera`),
  FOREIGN KEY (`email`) REFERENCES utente (`email`),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
