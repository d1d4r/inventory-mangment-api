const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getAllPurchase = async (req, res) => {
  try {
    const allPurchase = await prisma.purchaseOrder.findMany();
    res.status(200).json(allPurchase);
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:8 ~ getAllProducts ~ error:",
      error
    );
    res.status(500).json({ message: "some thing went worng" });
  }
};

const createNewPurchase = async (req, res) => {
  const { SupplierID, OrderDate, Status } = req.body;
  try {
    await prisma.purchaseOrder.create({
      data: {
        SupplierID,
        OrderDate,
        Status,
      },
    });
    res.status(201).json({ message: "purchase Ordered " });
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:29 ~ createNewProduct ~ error:",
      error
    );

    res.status(500).json({ message: error.code });
  }
};

module.exports = { createNewPurchase, getAllPurchase };
