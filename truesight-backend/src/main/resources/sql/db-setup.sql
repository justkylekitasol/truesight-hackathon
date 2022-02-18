CREATE SCHEMA `db_truesight_hackathon` ;

CREATE TABLE `db_truesight_hackathon`.`tbl_battle_data` (
  `id` INT NOT NULL,
  `team` VARCHAR(45) NULL,
  `player_id` VARCHAR(45) NULL,
  `opponent` VARCHAR(45) NULL,
  `position` VARCHAR(45) NULL,
  `champion` VARCHAR(45) NULL,
  `kills` INT NULL,
  `deaths` INT NULL,
  `assists` INT NULL,
  `creep_score` INT NULL,
  `gold_earned` INT NULL,
  `result` VARCHAR(45) NULL,
  `is_fraud` TINYINT NULL,
  PRIMARY KEY (`id`));
