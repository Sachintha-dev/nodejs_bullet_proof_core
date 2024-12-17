-- CreateTable
CREATE TABLE `version` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(255) NOT NULL,
    `lang` VARCHAR(255) NOT NULL,
    `version` VARCHAR(255) NOT NULL,
    `inReview` BOOLEAN NOT NULL DEFAULT false,
    `reviewVersion` VARCHAR(255) NOT NULL,
    `platform` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `en` VARCHAR(255) NULL,
    `si` VARCHAR(255) NULL,
    `ta` VARCHAR(255) NULL,
    `ds_code` VARCHAR(255) NULL,
    `district_code` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `district` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `en` VARCHAR(255) NULL,
    `si` VARCHAR(255) NULL,
    `ta` VARCHAR(255) NULL,
    `district_code` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountName` VARCHAR(255) NULL,
    `accountNo` VARCHAR(255) NULL,
    `bank` VARCHAR(255) NULL,
    `branch` VARCHAR(255) NULL,
    `userId` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardStatus` BOOLEAN NULL DEFAULT true,
    `issuedDate` DATETIME(3) NULL,
    `expiredIN` DATETIME(3) NULL,
    `userId` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(100) NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `lname` VARCHAR(255) NOT NULL,
    `callname` VARCHAR(255) NULL,
    `membershipNo` VARCHAR(50) NOT NULL,
    `nic` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `contactNo` VARCHAR(100) NOT NULL,
    `dob` DATETIME(3) NULL,
    `registered_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gender` ENUM('male', 'female') NULL,
    `marital` ENUM('married', 'single', 'divorced') NULL,
    `mcode` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `verified` BOOLEAN NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `verificationCode` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted` DATETIME(3) NULL,
    `created_by` VARCHAR(191) NULL,
    `created_by_name` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `dsId` INTEGER NULL,
    `districtId` INTEGER NULL,
    `provider` VARCHAR(191) NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetAt` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `users_membershipNo_key`(`membershipNo`),
    UNIQUE INDEX `users_nic_key`(`nic`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_contactNo_key`(`contactNo`),
    UNIQUE INDEX `users_verificationCode_key`(`verificationCode`),
    INDEX `users_email_verificationCode_passwordResetToken_idx`(`email`, `verificationCode`, `passwordResetToken`),
    UNIQUE INDEX `users_email_nic_verificationCode_membershipNo_passwordResetT_key`(`email`, `nic`, `verificationCode`, `membershipNo`, `passwordResetToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_bank` ADD CONSTRAINT `user_bank_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_card` ADD CONSTRAINT `user_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_dsId_fkey` FOREIGN KEY (`dsId`) REFERENCES `ds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `district`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
