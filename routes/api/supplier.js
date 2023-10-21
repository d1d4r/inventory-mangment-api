const express = require("express");
const router = express.Router();
const supplierController = require("../../controllers/TabelsAndCRUD/supplierController");

router
  .route("/")
  .post(supplierController.createNewSupplier)
  .get(supplierController.getAllSuppliers);

module.exports = router;
