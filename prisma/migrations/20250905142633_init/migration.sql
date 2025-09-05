-- CreateTable
CREATE TABLE `db_userList` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `address` CHAR(45) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `db_userList_id_key`(`id`),
    UNIQUE INDEX `db_userList_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_coinPrise` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(30, 8) NOT NULL DEFAULT 0,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `db_coinPrise_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_blockChainInfo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `chain` VARCHAR(20) NOT NULL,
    `blocks` INTEGER UNSIGNED NOT NULL,
    `headers` INTEGER UNSIGNED NOT NULL,
    `bestblockhash` CHAR(64) NOT NULL,
    `difficulty` DECIMAL(30, 8) NOT NULL,
    `time` INTEGER UNSIGNED NOT NULL,
    `mediantime` INTEGER UNSIGNED NOT NULL,
    `verificationprogress` DECIMAL(30, 8) NOT NULL,
    `initialblockdownload` BOOLEAN NOT NULL,
    `chainwork` CHAR(64) NOT NULL,
    `size_on_disk` INTEGER UNSIGNED NOT NULL,
    `pruned` BOOLEAN NOT NULL,
    `warnings` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `db_blockChainInfo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_sendRawTransaction` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `address` CHAR(45) NOT NULL,
    `txid` CHAR(64) NOT NULL,
    `rawtx` TEXT NOT NULL,
    `totalInput` DECIMAL(30, 8) NOT NULL,
    `totalOutput` DECIMAL(30, 8) NOT NULL,
    `change` DECIMAL(30, 8) NOT NULL,
    `feeRate` DECIMAL(30, 8) NOT NULL,
    `appFee` DECIMAL(30, 8) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `db_sendRawTransaction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
