drop database mydb
use mydb
select product.id,product.category,product.title,product.description,product.price,product.texture,product.wash,product.place,product.note,product.story,product.main_image from product where product.id = '1001'
select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = '1001'
0	121	06:51:26	CREATE TABLE IF NOT EXISTS `mydb`.`order_list` (
   `order_table_prime` VARCHAR(80) NOT NULL,
   `product_id` VARCHAR(45) NULL,
   `name` VARCHAR(45) NULL,
   `price` INT(45) NULL,
   `color_code` VARCHAR(45) NULL,
   `color_name` VARCHAR(45) NULL,
   `size` VARCHAR(5) NULL,
   `qty` INT(45) NULL,
   PRIMARY KEY (`order_table_prime`),
   CONSTRAINT `fk_order_list_order_table1`
     FOREIGN KEY (`order_table_prime`)
     REFERENCES `mydb`.`order_table` (`prime`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION)
 ENGINE = InnoDB
select colors.* from productdetail inner join colors on colors.code = productdetail.colors_code where productdetail.product_id = '1001'
select * from product
select * from productdetail
select * from colors
select * from campaign
select * from user
select * from order_table
select * from order_list

DELETE FROM product WHERE id='8006';
DELETE FROM productdetail WHERE product_id='8003';

UPDATE campaign
SET picture='15636147844510.jpg'
WHERE id = '4';

UPDATE product
SET main_image='https://kelolooo.s3.amazonaws.com/1565228490411main.jpg',image0='https://kelolooo.s3.amazonaws.com/15652284904210.jpg',image1='https://kelolooo.s3.amazonaws.com/15652284905011.jpg'
WHERE id = '2003';

UPDATE product
SET main_image='https://kelolooo.s3.us-east-2.amazonaws.com/1565228530460main.jpg',image0='https://kelolooo.s3.us-east-2.amazonaws.com/15652285304640.jpg',image1='https://kelolooo.s3.us-east-2.amazonaws.com/15652285304691.jpg'
WHERE id = '2234';

UPDATE product
SET main_image='https://kelolooo.s3.amazonaws.com/1565225441756main.jpg',image0='https://kelolooo.s3.amazonaws.com/15652254417650.jpg',image1='https://kelolooo.s3.amazonaws.com/15652254418421.jpg'
WHERE id = '3001';

select count(id) from product
select count(id) from product

insert into `product`(`id`,`category`,`title`,`description`,`price`,`texture`,`wash`,`place`,`note`,`story`,`main_image`,`image0`,`image1`) values
('1001','women','厚實毛呢格子外套','厚實毛呢格子外套','200','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1002','women','厚實毛呢格子外套','厚實毛呢格子外套','400','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1003','women','厚實毛呢格子外套','厚實毛呢格子外套','699','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1004','men','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1005','men','厚實毛呢格子外套','厚實毛呢格子外套','450','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1006','men','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1007','accessories','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1008','accessories','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg'),
('1009','accessories','厚實毛呢格子外套','厚實毛呢格子外套','500','棉、聚脂纖維','手洗（水溫40度)','韓國','實品顏色以單品照為主','厚實毛呢格子外套','1563614784438main.jpg','15636147844510.jpg','15636147844531.jpg');

991212  119911
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

insert into `productdetail`(`product_id`,`colors_code`,`size`,`stock`) values
('1001','222222','m','3'),
('1001','333333','m','3'),
('1002','111111','s','5'),
('1004','222222','l','3');

insert into `colors`(`code`,`name`) values
('991212','深紅'),
('119911','綠色'),
('111111','深藍'),
('222222','白色'),
('333333','黑色');


insert into `campaign`(`product_id`,`picture`,`story`) values
('1001','15636147844510.jpg','於是 我也想要給你 一個那麼美好的自己。 不朽《與自己和好如初》'),
('1002','15636147844510.jpg','永遠 展現自信與專業 無法抵擋的男人魅力。 復古《再一次經典》'),
('1003','15636147844510.jpg','於是 我也想要給你 一個那麼美好的自己。 不朽《與自己和好如初》');



-- all product 
select  product.*, colors.* , productdetail.*
from productdetail
	inner join product
		on product.id = productdetail.product_id
	inner join colors
		on colors.code = productdetail.colors_code


-- get color
select colors.* 
from productdetail 
	inner join colors on colors.code = productdetail.colors_code 
order by productdetail.product_id

-- get variant
select * from productdetail order by productdetail.product_id

-- get sizes
select product.id, productdetail.size
from productdetail
	inner join product
		on product.id = productdetail.product_id
order by productdetail.product_id


select DISTINCT product.*, colors.* , productdetail.size, productdetail.stock from productdetail inner join product on product.id = productdetail.product_id inner join colors on colors.code = productdetail.colors_code order by product.id

select distinct id from product;


