/*
  Warnings:

  - You are about to drop the column `description` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `photos` DROP COLUMN `description`,
    ADD COLUMN `caption` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `content`,
    ADD COLUMN `description` VARCHAR(191) NULL;
