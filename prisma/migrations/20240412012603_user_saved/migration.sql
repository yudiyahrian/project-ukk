-- AlterTable
ALTER TABLE `albums` ADD COLUMN `privacy` ENUM('public', 'private') NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE `photos` ADD COLUMN `privacy` ENUM('public', 'private') NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE `posts` ADD COLUMN `album_id` VARCHAR(191) NULL,
    ADD COLUMN `privacy` ENUM('public', 'private') NOT NULL DEFAULT 'public';

-- CreateTable
CREATE TABLE `user_saved` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NULL,
    `photo_id` VARCHAR(191) NULL,
    `album_id` VARCHAR(191) NOT NULL DEFAULT 'default_saved_image_album',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `saved_photo_photo_id_fkey`(`photo_id`),
    INDEX `saved_photo_user_id_fkey`(`user_id`),
    INDEX `saved_photo_post_id_fkey`(`post_id`),
    INDEX `saved_photo_album_id_fkey`(`album_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_saved` ADD CONSTRAINT `user_saved_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_saved` ADD CONSTRAINT `user_saved_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_saved` ADD CONSTRAINT `user_saved_photo_id_fkey` FOREIGN KEY (`photo_id`) REFERENCES `photos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_saved` ADD CONSTRAINT `user_saved_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
