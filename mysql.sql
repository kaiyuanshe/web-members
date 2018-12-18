CREATE DATABASE kaiyuanshe;

use kaiyuanshe;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `wechat_id` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `work_group` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `referee1` varchar(255),
  `referee2` varchar(255),
  `github_name` varchar(255),
  `introduce`  varchar(3000),
  `status` varchar(100),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `wechat_friends` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `wechat_id` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1;
