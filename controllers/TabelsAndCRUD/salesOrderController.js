const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getAllSales = async (req, res) => {
  try {
    const allPurchase = await prisma.salesOrder.findMany();
    res.status(200).json(allPurchase);
  } catch (error) {
    console.log(
      "🚀 ~ file: salesOrderController.js:8 ~ getAllSales ~ error:",
      error
    );

    res.status(500).json({ message: "some thing went worng" });
  }
};

const createNewSale = async (req, res) => {
  const { CustomerID, OrderDate, Status } = req.body;
  try {
    await prisma.salesOrder.create({
      data: {
        CustomerID,
        OrderDate,
        Status,
      },
    });
    res.status(201).json({ message: "sales ordered " });
  } catch (error) {
    console.log(
      "🚀 ~ file: salesOrderController.js:28 ~ createNewSale ~ error:",
      error
    );

    res.status(500).json({ message: error.code });
  }
};

module.exports = { createNewSale, getAllSales };
