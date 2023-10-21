const express = require("express");
const categoryController = require("../../controllers/TabelsAndCRUD/categoryController");
const router = express.Router();

router
  .route("/")
  .post(categoryController.createNewCategory)
  .get(categoryController.getAllCategory);

module.exports = router;
