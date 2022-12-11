const express = require('express')
const router = express.Router()
const { comments, createComment } = require('../services/Comment.service')

//aqui manejo las rutas del comment

/**
 * trae todos los post o los seleccionados
 * tipo : get
 * ruta : /comment
 * no requiere de parametro alguno pero puede ocupar Query
 */

//                                      Search all || search by text || search by type
router.get("/", async (req, res) => {
    try {
        comments(req, res)
    } catch (error) {
        res.status(400).json(error.message)
    }
})
/**
 * Genera un nuevo post
 * tipo : post
 * ruta : /comment
 * requiere del id de la post
 */

router.post('/:id', async (req, res) => {
    try {
        createComment(req, res)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

module.exports = router


