const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const totalRevenueSpecificDate = async (req, res) => {
  const { startDate, endDate } = req.query;

  let totalRevenue = await prisma.$queryRaw`
  SELECT SUM(soi.Quantity * soi.UnitPrice) AS TotalRevenue 
  FROM SalesOrderItem soi
  WHERE soi.OrderID IN (
    SELECT OrderID 
    FROM SalesOrder 
    WHERE OrderDate BETWEEN ${startDate} AND ${endDate}
  )
`;

  return totalRevenue;
  //res.status(200).json(totalRevenue.TotalRevenue);
};

module.exports = { totalRevenueSpecificDate };
