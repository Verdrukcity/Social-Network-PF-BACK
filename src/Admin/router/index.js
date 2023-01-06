const { Router } = require('express');
const verifyToken = require('../../middlewares');

const routerAdmin = require('./create.admin.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/**
 * 
 */

/**
 * lo envio a la ruta del create
 */
router.use('/admin',verifyToken, routerAdmin);


module.exports = router;
