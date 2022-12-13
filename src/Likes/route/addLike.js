const express = require('express')
const router = express.Router()
const { likes, addLike } = require('../services/like.service')

//Aqui manejo las rutas del like

/**
 * Trae todos los likes
 * tipo : get
 * ruta : /like
 * Requiere que venga el id del post por params
 */

//Search all || search by text || search by type
router.get('/', async (req, res) => {
  try {
    likes(req, res)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
/**
 * Genera un nuevo like
 * tipo : Like
 * ruta : /like
 * Requiere del id de la post
 */

router.post('/:id', async (req, res) => {
  try {
    addLike(req, res)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
