const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  totalRevenueSpecificDate,
} = require("../revenusCalculation/specificDateRevenueController");
const { monthlyRevenue } = require("../revenusCalculation/monthlyRevenue");
const getAllSalesOrderItem = async (req, res) => {
  try {
    const allPurchase = await prisma.salesOrderItem.findMany({
      include: {
        order: true,
        product: true,
      },
    });
    res.status(200).json(allPurchase);
  } catch (error) {
    console.log(
      "🚀 ~ file: salesOrderItemController.js:8 ~ getAllSalesOrderItem ~ error:",
      error
    );

    res.status(500).json({ message: "some thing went worng" });
  }
};

const createNewOrderSalesItem = async (req, res) => {
  const { OrderID, ProductID, Quantity, UnitPrice } = req.body;
  try {
    const x = await prisma.salesOrderItem.create({
      data: {
        OrderID,
        ProductID,
        Quantity,
        UnitPrice,
      },
    });
    res.status(201).json({ message: x });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      const regex = /{ code: (\d+), message: "([^"]+)", state: "(\d+)" }/;
      const match = error.message.match(regex);
      if (match) {
        const [, errorCode, errorMessage, errorState] = match;

        if (errorMessage === "Product is out of stock") {
          res.status(400).json({ message: "out of stock !!!!" });
        }
        // console.log("Error Code:", errorCode);
        // console.log("Error Message:", errorMessage);
        // console.log("Error State:", errorState);
      } else {
        console.log("Pattern not found in the error message");
      }
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await totalRevenueSpecificDate(req, res);
    res.status(200).json(totalRevenue);
  } catch (error) {
    res.status(200).json({ message: error.message, error: error.code });
  }
};


const getMonthlyRevenue = async (req, res) => {
  try {
    const mothRev = await monthlyRevenue();
    res.status(200).json(mothRev);
  } catch (error) {
    res.status(200).json({ message: error.message, error: error.code });
  }
};

module.exports = {
  createNewOrderSalesItem,
  getAllSalesOrderItem,
  getTotalRevenue,
  getMonthlyRevenue,
};
