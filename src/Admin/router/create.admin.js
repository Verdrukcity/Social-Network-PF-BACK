const express = require('express')
const router = express.Router()
const {
    Message_Error_Create_Post
} = require( "../../Message");
const { upUser, postUp } = require('../services/Admin.service.js');

//aqui manejo las rutas del create

/**
 * trae todos los post o los seleccionados
 * tipo : get
 * ruta : /admin
 * no requiere de parametro alguno pero puede ocupar Query
 */

//                                      Search all || search by text || search by type
router.get("/" , async (req, res) => {
    try {
      await upUser(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get("/post" , async (req, res) => {
    try {
      await postUp(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router



