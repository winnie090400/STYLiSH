-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`colors` (
  `code` INT(50) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

insert into `colors`(`code`,`name`) values
('991212','深紅'),
('119911','綠色'),
('111111','深藍'),
('222222','白色'),
('333333','黑色');

-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `id` INT(50) NOT NULL,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `price` INT(50) NULL DEFAULT NULL,
  `texture` VARCHAR(45) NULL DEFAULT NULL,
  `wash` VARCHAR(45) NULL DEFAULT NULL,
  `place` VARCHAR(45) NULL DEFAULT NULL,
  `note` VARCHAR(100) NULL DEFAULT NULL,
  `story` VARCHAR(200) NULL,
  `main_image` VARCHAR(255) NULL DEFAULT NULL,
  `image0` VARCHAR(255) NULL DEFAULT NULL,
  `image1` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

insert into `product`(`id`,`category`,`title`,`description`,`price`,`texture`,`wash`,`place`,`note`,`story`,`main_image`,`image0`,`image1`) values
('1001','women','厚實毛呢格子外套','厚實毛呢格子外套','200','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.amazonaws.com/1565228490411main.jpg','https://kelolooo.s3.amazonaws.com/15652284904210.jpg','https://kelolooo.s3.amazonaws.com/15652284905011.jpg'),
('1002','women','厚實毛呢格子外套','厚實毛呢格子外套','400','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.us-east-2.amazonaws.com/1565228530460main.jpg','https://kelolooo.s3.us-east-2.amazonaws.com/15652285304640.jpg','https://kelolooo.s3.us-east-2.amazonaws.com/15652285304691.jpg'),
('1003','women','厚實毛呢格子外套','厚實毛呢格子外套','699','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.amazonaws.com/1565225441756main.jpg','https://kelolooo.s3.amazonaws.com/15652254417650.jpg','https://kelolooo.s3.amazonaws.com/15652254418421.jpg'),
('1004','men','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.amazonaws.com/1565228490411main.jpg','https://kelolooo.s3.amazonaws.com/15652284904210.jpg','https://kelolooo.s3.amazonaws.com/15652284905011.jpg'),
('1005','men','厚實毛呢格子外套','厚實毛呢格子外套','450','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.us-east-2.amazonaws.com/1565228530460main.jpg','https://kelolooo.s3.us-east-2.amazonaws.com/15652285304640.jpg','https://kelolooo.s3.us-east-2.amazonaws.com/15652285304691.jpg'),
('1006','men','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.amazonaws.com/1565225441756main.jpg','https://kelolooo.s3.amazonaws.com/15652254417650.jpg','https://kelolooo.s3.amazonaws.com/15652254418421.jpg'),
('1007','accessories','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.amazonaws.com/1565228490411main.jpg','https://kelolooo.s3.amazonaws.com/15652284904210.jpg','https://kelolooo.s3.amazonaws.com/15652284905011.jpg'),
('1008','accessories','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.us-east-2.amazonaws.com/1565228530460main.jpg','https://kelolooo.s3.us-east-2.amazonaws.com/15652285304640.jpg','https://kelolooo.s3.us-east-2.amazonaws.com/15652285304691.jpg'),
('1009','accessories','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','https://kelolooo.s3.amazonaws.com/1565225441756main.jpg','https://kelolooo.s3.amazonaws.com/15652254417650.jpg','https://kelolooo.s3.amazonaws.com/15652254418421.jpg');


-- -----------------------------------------------------
-- Table `mydb`.`productdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productdetail` (
  `product_id` INT(50) NOT NULL,
  `colors_code` INT(50) NOT NULL,
  `size` VARCHAR(10) NULL DEFAULT NULL,
  `stock` INT(50) NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`, `colors_code`),
  INDEX `fk_product_colors1_idx` (`colors_code` ASC),
  INDEX `fk_productDetail_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_productDetail_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`),
  CONSTRAINT `fk_product_colors1`
    FOREIGN KEY (`colors_code`)
    REFERENCES `mydb`.`colors` (`code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

insert into `productdetail`(`product_id`,`colors_code`,`size`,`stock`) values
('1001','111111','s','3'),
('1001','222222','m','5'),
('1001','991212','l','3'),
('1002','119911','m','5'),
('1003','991212','l','2'),
('1004','222222','m','5'),
('1004','119911','s','3'),
('1004','991212','l','5'),
('1005','333333','l','2'),
('1005','991212','s','3'),
('1006','119911','s','3'),
('1007','222222','m','5'),
('1008','119911','l','2'),
('1009','222222','m','5');

-- -----------------------------------------------------
-- Table `mydb`.`campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`campaign` (
  `id` INT(50) NOT NULL auto_increment,
  `product_id` INT(50) NOT NULL,
  `picture` VARCHAR(45) NULL,
  `story` VARCHAR(100) NULL,
  PRIMARY KEY (`id`, `product_id`),
  INDEX `fk_campaign_product1_idx` (`product_id` ASC),
  CONSTRAINT `fk_campaign_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

insert into `campaign`(`product_id`,`picture`,`story`) values
('1001','15636147844510.jpg','於是 我也想要給你 一個那麼美好的自己。 不朽《與自己和好如初》'),
('1002','15636147844510.jpg','永遠 展現自信與專業 無法抵擋的男人魅力。 復古《再一次經典》'),
('1003','15636147844510.jpg','於是 我也想要給你 一個那麼美好的自己。 不朽《與自己和好如初》');


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT(50) NOT NULL auto_increment,
  `provider` VARCHAR(50) NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `token_expired` VARCHAR(100) NOT NULL,
  `picture` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `mydb`.`order_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_table` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `prime` VARCHAR(80) NOT NULL,
  `user_id` INT(50) NOT NULL,
  `shipping` VARCHAR(45) NULL DEFAULT NULL,
  `payment` VARCHAR(45) NULL DEFAULT NULL,
  `subtotal` INT(45) NULL DEFAULT NULL,
  `freight` INT(45) NULL DEFAULT NULL,
  `total` INT(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `time` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_order_table_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_order_table_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `mydb`.`order_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_list` (
  `order_table_id` INT(50) NOT NULL,
  `product_id` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `price` INT(45) NULL,
  `color_code` VARCHAR(45) NULL,
  `color_name` VARCHAR(45) NULL,
  `size` VARCHAR(5) NULL,
  `qty` INT(45) NULL,
  PRIMARY KEY (`order_table_id`),
  CONSTRAINT `fk_order_list_order_table1`
    FOREIGN KEY (`order_table_id`)
    REFERENCES `mydb`.`order_table` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


