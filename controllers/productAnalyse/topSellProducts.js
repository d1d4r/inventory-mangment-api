const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const topSellProducts = async () => {
  const topSellingProducts = await prisma.$queryRaw`
      SELECT 
        p.ProductName, SUM(soi.Quantity) AS TotalQuaintity,
        SUM(soi.Quantity * soi.UnitPrice) AS TotalRevenue
      FROM 
        Product p
      JOIN 
        SalesOrderItem soi ON p.ProductID = soi.ProductID
      GROUP BY 
        p.ProductName
      ORDER BY 
        TotalRevenue DESC
      LIMIT 
        10;
    `;

  return topSellingProducts;
};
module.exports = { topSellProducts };
