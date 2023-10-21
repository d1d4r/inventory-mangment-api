/*
  Warnings:

  - Added the required column `UnitPriceSale` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `UnitPriceSale` DOUBLE NOT NULL;
