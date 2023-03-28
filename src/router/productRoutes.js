const express = require("express");
const router = express.Router();
const { getAllProducts, getProduct } = require("../database/products");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send({ status: "OK", data: products });
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await getProduct(req.params.productId);

    if (!product) {
      res.status(404).send({ status: "FAILED", data: "Product not found" });
      return;
    }

    res.send({ status: "OK", data: product });
  } catch (err) {
    res.status(401).send({ status: "FAILED", error: err.message });
  }
});

module.exports = router;
