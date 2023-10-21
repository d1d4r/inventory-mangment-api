const express = require("express");
const router = express.Router();
const salesOrderItemController = require("../../controllers/TabelsAndCRUD/salesOrderItemController");

router
  .route("/")
  .post(salesOrderItemController.createNewOrderSalesItem)
  .get(salesOrderItemController.getAllSalesOrderItem);

router.route("/totalRevenue").get(salesOrderItemController.getTotalRevenue);

router
  .route("/monthly-revenue")
  .get(salesOrderItemController.getMonthlyRevenue);

module.exports = router;
