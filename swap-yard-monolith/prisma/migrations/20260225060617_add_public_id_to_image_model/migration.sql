-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_listingId_fkey`;

-- DropIndex
DROP INDEX `Image_listingId_fkey` ON `Image`;

-- AlterTable
ALTER TABLE `Image` ADD COLUMN `publicId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
