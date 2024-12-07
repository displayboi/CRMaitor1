-- CreateTable
CREATE TABLE `citas` (
    `fecha` DATE NOT NULL,
    `texto` VARCHAR(500) NOT NULL,
    `userId` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
