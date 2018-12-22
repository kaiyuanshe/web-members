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

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `room_id` varchar(255),
  `room_topic` varchar(255),
  `from_user_id` varchar(255) NOT NULL,
  `from_user_name` varchar(255) NOT NULL,
  `mention_id_list` varchar(3000),
  `mention_name_list` varchar(3000),
  `text` varchar(3000),
  `create_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1;