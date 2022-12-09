const { Router } = require('express')

const getCategories = require('./get.router.js')

const router = Router()

/**
 * ruta principal de las categorías
 */

router.use('/categories', getCategories)

module.exports = router
