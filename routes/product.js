var express = require("express");
var router = express.Router();
var productcontroller = require("../controllers/productcontroller");
const upload = require("../middleware/upload"); // your multer setup

// GET all products
router.get("/", productcontroller.getAllProducts);

// ADD product
router.post("/", upload.single("Product_image"), productcontroller.createProduct);

// UPDATE product

router.put("/:id", upload.single("Product_image"), productcontroller.updateProduct);

// DELETE product
router.delete("/:id", productcontroller.deleteProduct);

module.exports = router;
