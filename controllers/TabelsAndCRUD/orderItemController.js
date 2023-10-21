const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrderItem = async (req, res) => {
  try {
    const allPurchase = await prisma.orderItem.findMany();
    res.status(200).json(allPurchase);
  } catch (error) {
    console.log(
      "🚀 ~ file: orderItemController.js:8 ~ getAllOrderItem ~ error:",
      error
    );

    res.status(500).json({ message: "some thing went worng" });
  }
};

const createNewOrderItem = async (req, res) => {
  const { OrderID, ProductID, Quantity, UnitPrice } = req.body;
  try {
    await prisma.orderItem.create({
      data: {
        OrderID,
        ProductID,
        Quantity,
        UnitPrice,
      },
    });
    res.status(201).json({ message: "item Ordered  " });
  } catch (error) {
    console.log(
      "🚀 ~ file: orderItemController.js:30 ~ createNewOrderItem ~ error:",
      error
    );

    res.status(500).json({ message: error.code });
  }
};
const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { OrderID, ProductID, Quantity, UnitPrice } = req.body;
  try {
    const updatedOrderItem = await prisma.orderItem.update({
      where: { id: parseInt(id) },
      data: {
        OrderID,
        ProductID,
        Quantity,
        UnitPrice,
      },
    });
    res.status(200).json(updatedOrderItem);
  } catch (error) {
    console.error("Error updating order item:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orderItem.delete({
      where: { OrderItemID: +id },
    });
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error("Error deleting order item:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createNewOrderItem,
  getAllOrderItem,
  deleteOrderItem,
  updateOrderItem,
};
