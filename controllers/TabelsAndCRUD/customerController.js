const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    //console.log("🚀 ~ file: customerController.js:7 ~ getAllCustomers ~ customers:", customers)
    res.json(customers);
  } catch (error) {
    console.log(
      "🚀 ~ file: customerController.js:11 ~ getAllCustomers ~ error:",
      error
    );
  }
};

const createNewCustomer = async (req, res) => {
  const { FirstName, LastName, Email, Phone } = req.body;
  //console.log("🚀 ~ file: customerController.js:7 ~ createNewCustomer ~ FirstName:", FirstName)
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        FirstName,
        LastName,
        Email,
        Phone,
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.log(
      "🚀 ~ file: customerController.js:7 ~ createNewCustomer ~ error:",
      error.message
    );
    res.status(500);
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "employee ID required" });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        CustomerID: +id,
      },
    });
    if (!customer) {
      res.json({ message: "not found" });
    }
    res.json(customer);
  } catch (error) {
    console.log(
      "🚀 ~ file: customerController.js:55 ~ getCustomerById ~ error:",
      error.message
    );
  }
};

module.exports = {
  createNewCustomer,
  getAllCustomers,
  getCustomerById,
};
