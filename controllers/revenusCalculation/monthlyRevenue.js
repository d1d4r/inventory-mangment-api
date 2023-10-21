const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const monthlyRevenue = async () => {
  const mothRev = prisma.$queryRaw`
SELECT
    MONTH(so.OrderDate) AS MONTH,
    YEAR(so.OrderDate) AS YEAR,
    SUM(soi.Quantity * soi.UnitPrice) AS MonthlyRevenue
FROM
    SalesOrder so
JOIN SalesOrderItem soi ON
    so.OrderID = soi.OrderID
WHERE
    so.OrderDate >= DATE_SUB(
        CURRENT_DATE(), INTERVAL 12 MONTH)
    GROUP BY
        YEAR,
        MONTH
    ORDER BY
        YEAR,
        MONTH;
    `;

  return mothRev;
};

module.exports = { monthlyRevenue };
