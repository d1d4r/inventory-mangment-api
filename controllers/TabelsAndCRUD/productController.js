const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { topSellProducts } = require("../productAnalyse/topSellProducts");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany({
      orderBy: {
        ProductID: "desc",
      },
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:8 ~ getAllProducts ~ error:",
      error
    );
    res.status(500).json({ message: "some thing went worng" });
  }
};

const createNewProduct = async (req, res) => {
  const {
    ProductName,
    Description,
    Price,
    QuantityInStock,
    SupplierID,
    CategoryID,
  } = req.body;
  try {
    await prisma.product.create({
      data: {
        ProductName,
        Description,
        Price: 0,
        QuantityInStock: 0,
        SupplierID,
        CategoryID,
      },
    });
    res.status(201).json({ message: "product added succesfully" });
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:29 ~ createNewProduct ~ error:",
      error
    );

    res.status(500).json({ message: error.code });
  }
};

const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        ProductID: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await prisma.product.delete({
      where: {
        ProductID: productId,
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id); // Assuming you pass the product ID in the URL parameter
  const {
    ProductName,
    Description,
    Price,
    QuantityInStock,
    SupplierID,
    CategoryID,
  } = req.body;

  try {
    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        ProductID: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If the product exists, update its properties
    await prisma.product.update({
      where: {
        ProductID: productId,
      },
      data: {
        ProductName,
        Description,
        Price,
        QuantityInStock,
        SupplierID,
        CategoryID,
      },
    });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTopSellProducts = async (req, res) => {
  try {
    const topSellProduct = await topSellProducts();
    res.status(200).json(topSellProduct);
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:52 ~ getTopSellProducts ~ error:",
      error
    );
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getTopSellProducts,
  deleteProduct,
  updateProduct,
};
