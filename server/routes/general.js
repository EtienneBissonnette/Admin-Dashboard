const express = require("express");
const router = express.Router();
const {getUser}= require("../controllers/general");

router.get("/user/:id", getUser);

module.exports = router;

