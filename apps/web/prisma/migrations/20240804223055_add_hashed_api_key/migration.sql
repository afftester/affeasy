/*
  Warnings:

  - You are about to drop the column `apiKey` on the `UserAdvertiserRelationship` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `UserAdvertiserRelationship` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Link` ADD COLUMN `aff_url` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `UserAdvertiserRelationship` DROP COLUMN `apiKey`,
    DROP COLUMN `password`,
    ADD COLUMN `accountId` VARCHAR(191) NULL,
    ADD COLUMN `clientId` VARCHAR(191) NULL,
    ADD COLUMN `encryptedApiKey` VARCHAR(191) NULL,
    ADD COLUMN `encryptedClientSecret` VARCHAR(191) NULL,
    ADD COLUMN `encryptedPassword` VARCHAR(191) NULL,
    ADD COLUMN `hashedApiKey` VARCHAR(191) NULL,
    ADD COLUMN `hashedClientSecret` VARCHAR(191) NULL,
    ADD COLUMN `hashedPassword` VARCHAR(191) NULL,
    ADD COLUMN `websiteId` VARCHAR(191) NULL;
