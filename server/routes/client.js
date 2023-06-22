const express = require("express");
const router = express.Router();
const {getProducts, getCustomers} = require("../controllers/client");

router.get("/products", getProducts);
router.get("/customers", getCustomers);

module.exports = router;
