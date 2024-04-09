/*
  Warnings:

  - Added the required column `followed` to the `user_follows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_follows` ADD COLUMN `followed` BOOLEAN NOT NULL;
