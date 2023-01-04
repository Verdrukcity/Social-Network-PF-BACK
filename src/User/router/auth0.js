const express = require("express");
const { authUser2 } = require("../services/auth0.service");
const router = express.Router();

router.post("/", authUser2)

module.exports = router;
