const { Router } = require('express');

const router = Router();
const routerLike = require('./addLike.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/**
 * lo envio a la ruta del create
 */
router.use('/like', routerLike);

module.exports = router;
