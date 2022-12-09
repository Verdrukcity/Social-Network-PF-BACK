const { Router } = require('express')

const router = Router()

/**
 * ruta principal de las categorías
 */

router.get('/categories', function (req, res, next) {
  res.send('Aquí van nuestras rutas de categories')
})

module.exports = router
