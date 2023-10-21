-- CreateTable
CREATE TABLE `Supplier` (
    `SupplierID` INTEGER NOT NULL AUTO_INCREMENT,
    `SupplierName` VARCHAR(191) NOT NULL,
    `ContactName` VARCHAR(191) NOT NULL,
    `ContactEmail` VARCHAR(191) NOT NULL,
    `ContactPhone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SupplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `CategoryID` INTEGER NOT NULL AUTO_INCREMENT,
    `CategoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CategoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `ProductID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductName` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NULL,
    `Price` DOUBLE NOT NULL,
    `QuantityInStock` INTEGER NOT NULL,
    `SupplierID` INTEGER NOT NULL,
    `CategoryID` INTEGER NOT NULL,

    PRIMARY KEY (`ProductID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrder` (
    `OrderID` INTEGER NOT NULL AUTO_INCREMENT,
    `SupplierID` INTEGER NOT NULL,
    `OrderDate` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `OrderItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `UnitPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`OrderItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `CustomerID` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CustomerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrder` (
    `OrderID` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerID` INTEGER NOT NULL,
    `OrderDate` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItem` (
    `OrderItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `UnitPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`OrderItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `PasswordHash` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `UserRoleID` INTEGER NOT NULL AUTO_INCREMENT,
    `RoleName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`UserRoleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserUserRole` (
    `UserUserRoleID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `UserRoleID` INTEGER NOT NULL,

    PRIMARY KEY (`UserUserRoleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_SupplierID_fkey` FOREIGN KEY (`SupplierID`) REFERENCES `Supplier`(`SupplierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryID_fkey` FOREIGN KEY (`CategoryID`) REFERENCES `Category`(`CategoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_SupplierID_fkey` FOREIGN KEY (`SupplierID`) REFERENCES `Supplier`(`SupplierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `PurchaseOrder`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_CustomerID_fkey` FOREIGN KEY (`CustomerID`) REFERENCES `Customer`(`CustomerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `SalesOrder`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserUserRole` ADD CONSTRAINT `UserUserRole_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserUserRole` ADD CONSTRAINT `UserUserRole_UserRoleID_fkey` FOREIGN KEY (`UserRoleID`) REFERENCES `UserRole`(`UserRoleID`) ON DELETE RESTRICT ON UPDATE CASCADE;
