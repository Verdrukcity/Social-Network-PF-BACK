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

/**
 * ruta que verifica si un usuario esta en la base de datos registrado 
 * route: /authuser
 * tipo: post
 * body: {
 *   userName : nombre de usuario (string),
 *   password: contraseña del usuario(string)
 * }
 * 
 */
router.post("/", async (req, res) => {
    try {
        authUser(req, res);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
