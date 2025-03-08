/*
  Warnings:

  - You are about to alter the column `role` on the `message` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `message` ADD COLUMN `name` TEXT NULL,
    MODIFY `role` ENUM('system', 'user', 'assistant', 'data') NOT NULL DEFAULT 'user';
