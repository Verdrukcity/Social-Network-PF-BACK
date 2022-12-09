const express = require('express')
const router = express.Router()
const post = require('../Post/router/index.js')
const categories = require('../Category/router/index.js')

/**
 * distribución de rutas
 */
router.use('/', post)
router.use('/', categories)

/* router.get('/', function (req, res, next) {
  res.send('Hello, world! Aquí armamos nuestras rutas 1')
}) */

module.exports = router
