/*
  Warnings:

  - Added the required column `liked` to the `comment_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liked` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment_likes` ADD COLUMN `liked` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `likes` ADD COLUMN `liked` BOOLEAN NOT NULL;
