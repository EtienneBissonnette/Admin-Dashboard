const express = require("express");
const router = express.Router();
const {getProducts, getCustomers, getTransactions} = require("../controllers/client");

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);

module.exports = router;
