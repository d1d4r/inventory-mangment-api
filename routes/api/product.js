const express = require("express");
const router = express.Router();
const productController = require("../../controllers/TabelsAndCRUD/productController");
router
  .route("/")
  .post(productController.createNewProduct)
  .get(productController.getAllProducts);

router.route("/top-selling-products").get(productController.getTopSellProducts);
router.route("/:id").delete(productController.deleteProduct);
router.route("/:id").patch(productController.updateProduct);

module.exports = router;
