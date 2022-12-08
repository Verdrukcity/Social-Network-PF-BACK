const { Router } = require('express');

const routerCreate = require('./create.router')

const routerDetail = require('./detail.router')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/**
 * lo envio a la ruta del create
 */
router.use('/create',routerCreate)

//ruta de detail
router.use('/detail',routerDetail)



module.exports = router;
