-- AlterTable
ALTER TABLE `User` ADD COLUMN `dateOfBirth` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `SellerVerification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NULL,
    `businessName` VARCHAR(191) NULL,
    `vatNumber` VARCHAR(191) NULL,
    `nin` VARCHAR(191) NULL,
    `businessLicenseUrl` VARCHAR(191) NULL,
    `businessLicensePublicId` VARCHAR(191) NULL,
    `idDocumentUrl` VARCHAR(191) NULL,
    `idDocumentPublicId` VARCHAR(191) NULL,
    `status` ENUM('NOT_SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'NOT_SUBMITTED',
    `reviewNote` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NULL,
    `reviewedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SellerVerification_userId_key`(`userId`),
    INDEX `SellerVerification_status_idx`(`status`),
    INDEX `SellerVerification_businessName_idx`(`businessName`),
    INDEX `SellerVerification_nin_idx`(`nin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SellerVerification` ADD CONSTRAINT `SellerVerification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
