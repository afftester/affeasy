-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subscribed` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAdvertiserRelationship` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `advertiserId` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,

    INDEX `UserAdvertiserRelationship_userId_idx`(`userId`),
    INDEX `UserAdvertiserRelationship_advertiserId_idx`(`advertiserId`),
    UNIQUE INDEX `UserAdvertiserRelationship_userId_advertiserId_key`(`userId`, `advertiserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Advertiser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BrandAdvertiserRelationship` (
    `id` VARCHAR(191) NOT NULL,
    `brandId` VARCHAR(191) NOT NULL,
    `advertiserId` VARCHAR(191) NOT NULL,
    `brandIdAtAdvertiser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BrandAdvertiserRelationship_brandIdAtAdvertiser_key`(`brandIdAtAdvertiser`),
    INDEX `BrandAdvertiserRelationship_brandId_idx`(`brandId`),
    INDEX `BrandAdvertiserRelationship_advertiserId_idx`(`advertiserId`),
    UNIQUE INDEX `BrandAdvertiserRelationship_brandId_advertiserId_key`(`brandId`, `advertiserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBrandRelationship` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `brandId` VARCHAR(191) NOT NULL,
    `advertiserId` VARCHAR(191) NOT NULL,
    `userAdvertiserRelationId` VARCHAR(191) NOT NULL,
    `brandAdvertiserRelationId` VARCHAR(191) NOT NULL,

    INDEX `UserBrandRelationship_userId_idx`(`userId`),
    INDEX `UserBrandRelationship_brandId_idx`(`brandId`),
    INDEX `UserBrandRelationship_advertiserId_idx`(`advertiserId`),
    INDEX `UserBrandRelationship_userAdvertiserRelationId_idx`(`userAdvertiserRelationId`),
    INDEX `UserBrandRelationship_brandAdvertiserRelationId_idx`(`brandAdvertiserRelationId`),
    UNIQUE INDEX `UserBrandRelationship_userId_brandId_advertiserId_key`(`userId`, `brandId`, `advertiserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `hashedKey` VARCHAR(191) NOT NULL,
    `partialKey` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NULL,
    `lastUsed` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Token_hashedKey_key`(`hashedKey`),
    INDEX `Token_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `plan` VARCHAR(191) NOT NULL DEFAULT 'free',
    `stripeId` VARCHAR(191) NULL,
    `billingCycleStart` INTEGER NOT NULL,
    `usage` INTEGER NOT NULL DEFAULT 0,
    `usageLimit` INTEGER NOT NULL DEFAULT 1000,
    `linksUsage` INTEGER NOT NULL DEFAULT 0,
    `linksLimit` INTEGER NOT NULL DEFAULT 25,
    `domainsLimit` INTEGER NOT NULL DEFAULT 3,
    `tagsLimit` INTEGER NOT NULL DEFAULT 5,
    `usersLimit` INTEGER NOT NULL DEFAULT 1,
    `monitoringId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `inviteCode` VARCHAR(191) NULL,

    UNIQUE INDEX `Project_slug_key`(`slug`),
    UNIQUE INDEX `Project_stripeId_key`(`stripeId`),
    UNIQUE INDEX `Project_monitoringId_key`(`monitoringId`),
    UNIQUE INDEX `Project_inviteCode_key`(`inviteCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectInvite` (
    `email` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ProjectInvite_projectId_idx`(`projectId`),
    UNIQUE INDEX `ProjectInvite_email_projectId_key`(`email`, `projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DefaultDomains` (
    `id` VARCHAR(191) NOT NULL,
    `offrsus` BOOLEAN NOT NULL DEFAULT true,
    `projectId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DefaultDomains_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectUsers` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('owner', 'member') NOT NULL DEFAULT 'member',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    INDEX `ProjectUsers_projectId_idx`(`projectId`),
    UNIQUE INDEX `ProjectUsers_userId_projectId_key`(`userId`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SentEmail` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `projectId` VARCHAR(191) NULL,

    INDEX `SentEmail_projectId_idx`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Domain` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `target` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'redirect',
    `placeholder` VARCHAR(191) NOT NULL DEFAULT 'https://dub.co/help/article/what-is-dub',
    `description` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NULL,
    `primary` BOOLEAN NOT NULL DEFAULT false,
    `archived` BOOLEAN NOT NULL DEFAULT false,
    `publicStats` BOOLEAN NOT NULL DEFAULT false,
    `clicks` INTEGER NOT NULL DEFAULT 0,
    `lastClicked` DATETIME(3) NULL,
    `lastChecked` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Domain_slug_key`(`slug`),
    INDEX `Domain_projectId_idx`(`projectId`),
    INDEX `Domain_clicks_idx`(`clicks` DESC),
    INDEX `Domain_lastClicked_idx`(`lastClicked`),
    INDEX `Domain_lastChecked_idx`(`lastChecked`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Link` (
    `id` VARCHAR(191) NOT NULL,
    `domain` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `url` LONGTEXT NOT NULL,
    `archived` BOOLEAN NOT NULL DEFAULT false,
    `expiresAt` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `proxy` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(280) NULL,
    `image` LONGTEXT NULL,
    `utm_source` VARCHAR(191) NULL,
    `utm_medium` VARCHAR(191) NULL,
    `utm_campaign` VARCHAR(191) NULL,
    `utm_term` VARCHAR(191) NULL,
    `utm_content` VARCHAR(191) NULL,
    `rewrite` BOOLEAN NOT NULL DEFAULT false,
    `ios` LONGTEXT NULL,
    `android` LONGTEXT NULL,
    `geo` JSON NULL,
    `userId` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NULL,
    `publicStats` BOOLEAN NOT NULL DEFAULT false,
    `clicks` INTEGER NOT NULL DEFAULT 0,
    `lastClicked` DATETIME(3) NULL,
    `checkDisabled` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `tagId` VARCHAR(191) NULL,
    `comments` LONGTEXT NULL,

    INDEX `Link_projectId_idx`(`projectId`),
    INDEX `Link_domain_idx`(`domain`),
    INDEX `Link_tagId_idx`(`tagId`),
    INDEX `Link_proxy_idx`(`proxy`),
    INDEX `Link_password_idx`(`password`),
    INDEX `Link_createdAt_idx`(`createdAt` DESC),
    INDEX `Link_clicks_idx`(`clicks` DESC),
    INDEX `Link_lastClicked_idx`(`lastClicked`),
    INDEX `Link_checkDisabled_idx`(`checkDisabled`),
    INDEX `Link_userId_idx`(`userId`),
    UNIQUE INDEX `Link_domain_key_key`(`domain`, `key`),
    FULLTEXT INDEX `Link_key_url_idx`(`key`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT 'blue',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    INDEX `Tag_projectId_idx`(`projectId`),
    UNIQUE INDEX `Tag_name_projectId_key`(`name`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkTag` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `linkId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    INDEX `LinkTag_linkId_idx`(`linkId`),
    INDEX `LinkTag_tagId_idx`(`tagId`),
    UNIQUE INDEX `LinkTag_linkId_tagId_key`(`linkId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jackson_index` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(250) NOT NULL,
    `storeKey` VARCHAR(250) NOT NULL,

    INDEX `_jackson_index_key`(`key`),
    INDEX `_jackson_index_key_store`(`key`, `storeKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jackson_store` (
    `key` VARCHAR(250) NOT NULL,
    `value` TEXT NOT NULL,
    `iv` VARCHAR(64) NULL,
    `tag` VARCHAR(64) NULL,
    `namespace` VARCHAR(64) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` TIMESTAMP(0) NULL,

    INDEX `_jackson_store_namespace`(`namespace`),
    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jackson_ttl` (
    `key` VARCHAR(250) NOT NULL,
    `expiresAt` BIGINT NOT NULL,

    INDEX `_jackson_ttl_expires_at`(`expiresAt`),
    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

