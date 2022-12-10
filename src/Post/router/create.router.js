const express = require('express')
const router = express.Router()
const { makePost, findPost } = require('../services/Post.service.js');


//aqui manejo las rutas del create

/**
 * trae todos los post o los seleccionados
 * tipo : get
 * ruta : /create
 * no requiere de parametro alguno pero puede ocupar Query
 */

//                                      Search all || search by text || search by type
router.get("/", async (req, res) => {
    try {
        findPost(req, res)
    } catch (error) {
        res.status(400).json(error.message)
    }
})
/**
 * Genera un nuevo post
 * tipo : post
 * ruta : /create
 * requiere del id del ususario 
 */

router.post('/:id', async (req, res) => {
    try {
        makePost(req, res)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

module.exports = router



