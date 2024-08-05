/*
  Warnings:

  - You are about to drop the column `hashedApiKey` on the `UserAdvertiserRelationship` table. All the data in the column will be lost.
  - You are about to drop the column `hashedClientSecret` on the `UserAdvertiserRelationship` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `UserAdvertiserRelationship` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserAdvertiserRelationship` DROP COLUMN `hashedApiKey`,
    DROP COLUMN `hashedClientSecret`,
    DROP COLUMN `hashedPassword`,
    ADD COLUMN `partialApiKey` VARCHAR(191) NULL,
    ADD COLUMN `partialClientSecret` VARCHAR(191) NULL,
    ADD COLUMN `partialPassword` VARCHAR(191) NULL;
