const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../../controllers/TabelsAndCRUD/purchaseOrderController");
router
  .route("/")
  .post(purchaseOrderController.createNewPurchase)
  .get(purchaseOrderController.getAllPurchase);

module.exports = router;
