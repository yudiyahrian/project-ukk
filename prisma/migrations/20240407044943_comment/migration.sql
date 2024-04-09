/*
  Warnings:

  - You are about to drop the column `parent_comment_id` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_parent_comment_id_fkey`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `parent_comment_id`,
    ADD COLUMN `reply_to_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `comments_parent_comment_id_fkey` ON `comments`(`reply_to_id`);

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_reply_to_id_fkey` FOREIGN KEY (`reply_to_id`) REFERENCES `comments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
