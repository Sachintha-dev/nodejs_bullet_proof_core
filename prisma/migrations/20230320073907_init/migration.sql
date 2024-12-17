/*
  Warnings:

  - You are about to drop the column `registered_date` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `registered_date`,
    ADD COLUMN `registeredDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
