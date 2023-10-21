const express = require("express");
const router = express.Router();

const customertController = require("../../controllers/TabelsAndCRUD/customerController");

router
  .route("/")
  .get(customertController.getAllCustomers)
  .post(customertController.createNewCustomer);

router.route("/:id").get(customertController.getCustomerById);

module.exports = router;
