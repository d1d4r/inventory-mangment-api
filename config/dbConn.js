const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dbConn = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log("🚀 ~ file: dbConn.js:10 ~ dbConn ~ error:", error);
  }
};

module.exports = dbConn;
