const express = require("express");
const router = express.Router();
const { authUser, userDefault } = require("../services/authUser.service.js");

router.get("/", async (req, res) => {
    try {
        userDefault(req, res);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        authUser(req, res);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
