const express = require("express");
const router = express.Router();
const salesOrderControlle = require("../../controllers/TabelsAndCRUD/salesOrderController");

router
  .route("/")
  .post(salesOrderControlle.createNewSale)
  .get(salesOrderControlle.getAllSales);

module.exports = router;
