/*
  Warnings:

  - You are about to alter the column `birthday` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `birthday` TIMESTAMP NULL;
