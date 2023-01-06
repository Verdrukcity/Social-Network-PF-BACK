const express = require('express')
const router = express.Router()
const { usersVerify } = require('../services/User.service')

//aqui manejo las rutas del user

/**
 * trae todos los profile o los seleccionados
 * tipo : get
 * ruta : /usersverify
 * hay que pasarle el toquen por query
 */

//                                      Search all || search by text || search by type
router.get("/", async (req, res) => {
    try {
        usersVerify(req, res)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})



module.exports = router