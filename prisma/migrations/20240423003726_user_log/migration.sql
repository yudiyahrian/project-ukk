-- CreateTable
CREATE TABLE `user_logs` (
    `id` VARCHAR(191) NOT NULL,
    `old_name` VARCHAR(191) NOT NULL,
    `new_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `old_description` VARCHAR(191) NULL,
    `new_description` VARCHAR(191) NULL,
    `old_image` VARCHAR(191) NULL,
    `new_image` VARCHAR(191) NULL,
    `old_bannerImage` VARCHAR(191) NULL,
    `new_bannerImage` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_logs_old_name_key`(`old_name`),
    UNIQUE INDEX `user_logs_new_name_key`(`new_name`),
    UNIQUE INDEX `user_logs_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
