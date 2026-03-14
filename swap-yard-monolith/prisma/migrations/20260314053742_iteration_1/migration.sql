/*
  Warnings:

  - Added the required column `accountType` to the `SellerAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SellerAccount` ADD COLUMN `accountType` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `deliveryAddress` VARCHAR(191) NULL;
