/*
  Warnings:

  - You are about to drop the column `access_token` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `photos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `photos_session_token_key` ON `photos`;

-- AlterTable
ALTER TABLE `photos` DROP COLUMN `access_token`,
    DROP COLUMN `expires`,
    DROP COLUMN `session_token`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_name_key` ON `users`(`name`);
