const express = require('express')
const router = express.Router()
const { upUser, postUp } = require('../services/Admin.service.js');

/**
 * trae todos los post o los seleccionados
 * tipo : post
 * ruta : /admin
 */

router.post("/" , async (req, res) => {
    try {
      await upUser(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post("/post" , async (req, res) => {
    try {
      await postUp(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router



