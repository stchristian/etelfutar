DROP TABLE IF EXISTS `MenuItems`;

CREATE TABLE `MenuItems` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Category` varchar(120) NOT NULL DEFAULT '',
  `Description` varchar(255) DEFAULT '',
  `Name` varchar(120) NOT NULL DEFAULT '',
  `Price` int(4) NOT NULL,
  `Spicy` smallint(1) DEFAULT NULL,
  `Vegatarian` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `MenuItems` (`id`, `Category`, `Description`, `Name`, `Price`, `Spicy`, `Vegatarian`)
VALUES
	(1,'Starter','Saláta csirkemellel, uborkával, pirított kenyérkockával','Cézár saláta',700,0,0),
	(2,'Starter','Amerikai káposztasaláta','Coleslaw',500,0,0),
	(3,'Starter','Tökmag pestoval','Tócsni',750,0,1),
	(4,'Soup','Csigatésztával vagy májgaluskával','Húsleves',800,0,0),
	(5,'Soup','Tejfölös csülkös','Bableves',1000,0,0),
	(6,'Soup','Tejszínhabbal, erdei gyümölcsökkel','Gyümölcsleves',1000,0,1),
	(7,'Soup','Pontyból, harcsából és busából','Halászlé',1500,1,0),
	(8,'MainDish','Törtburgonyával','Pacalpörkölt',1200,0,1),
	(9,'MainDish','Törtburgonyával','Pacalpörkölt',1200,0,0),
	(10,'MainDish','','Bécsi szelet',2500,0,0),
	(11,'MainDish','Rizzsel, vagy hasábburgonyával','Rántott cukkini',1500,0,1),
	(12,'MainDish','Galuskával','Marhapörkölt',2500,0,1),
	(13,'Pizza','Paradicsomszósz, bazsalikom','Pizza Margherita',1000,0,1),
	(14,'Pizza','Tonhalas, paradicsomos, mozzarellás','Pizza Tonno',1500,0,0),
	(15,'Pizza','Négyféle sajttal','Pizza Quattro Formaggi',2000,0,1),
	(16,'Pizza','Sonkával, pikáns szalámival, füstölt kolbásszal','Húsimádó Pizza',2000,1,0),
	(17,'Dessert','','Somlói galuska',1000,0,0),
	(18,'Drink',NULL,'Coca-Cola',300,NULL,NULL),
	(19,'Drink',NULL,'Ásványvíz',300,NULL,NULL),
	(20,'Drink',NULL,'Házi limonádé',650,NULL,NULL),
	(21,'Drink',NULL,'Red Bull',700,NULL,NULL);


