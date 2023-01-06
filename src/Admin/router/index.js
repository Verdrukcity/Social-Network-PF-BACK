const { Router } = require('express');
const {verifyTokenAdmin} = require('../../middlewares');

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
router.use('/admin',verifyTokenAdmin, routerAdmin);


module.exports = router;
