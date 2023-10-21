const express = require("express");
const router = express.Router();
const orderItemController = require("../../controllers/TabelsAndCRUD/orderItemController");

router
  .route("/")
  .post(orderItemController.createNewOrderItem)
  .get(orderItemController.getAllOrderItem);

router.route("/:id").patch(orderItemController.updateOrderItem);
router.route("/:id").delete(orderItemController.deleteOrderItem);

module.exports = router;
