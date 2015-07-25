CREATE USER 'lockSysAdmin'@'localhost' IDENTIFIED BY 'db_lock_sys_mgr';

CREATE DATABASE db_lock_sys_mgr;
use db_lock_sys_mgr;

CREATE TABLE db_lock_sys_mgr.user(
`id` int(11) NOT NULL,
`username` varchar(45) DEFAULT NULL,
`password_hash` varchar(100) DEFAULT NULL,
`role` varchar(45) DEFAULT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO db_lock_sys_mgr.user VALUES(1,'admin','$2a$10$ebyC4Z5WtCXXc.HGDc1YoeBK5X0APjU1eQu8STFqcnQca4IkjsTyi','ROLE_ADMIN');
INSERT INTO db_lock_sys_mgr.user VALUES(2,'user','$2a$10$ebyC4Z5WtCXXc.HGDc1YoeBK5X0APjU1eQu8STFqcnQca4IkjsTyi','ROLE_USER');
