/*
  Warnings:

  - You are about to drop the `comment_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationrequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment_likes` DROP FOREIGN KEY `comment_likes_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment_likes` DROP FOREIGN KEY `comment_likes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_parent_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_photo_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `photo_likes` DROP FOREIGN KEY `photo_likes_photo_id_fkey`;

-- DropForeignKey
ALTER TABLE `photo_likes` DROP FOREIGN KEY `photo_likes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropTable
DROP TABLE `comment_likes`;

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `photo_likes`;

-- DropTable
DROP TABLE `sessions`;

-- DropTable
DROP TABLE `verificationrequest`;

-- CreateTable
CREATE TABLE `Photo_Album` (
    `id` VARCHAR(191) NOT NULL,
    `albumId` VARCHAR(191) NOT NULL,
    `photoId` VARCHAR(191) NOT NULL,

    INDEX `photo_album_album_id_index`(`albumId`),
    INDEX `photo_album_photo_id_index`(`photoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo_Album` ADD CONSTRAINT `Photo_Album_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo_Album` ADD CONSTRAINT `Photo_Album_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `photos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
