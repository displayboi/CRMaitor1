CREATE TABLE `User` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `User_username_key` (`username`)
);
