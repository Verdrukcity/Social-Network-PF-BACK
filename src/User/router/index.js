const { Router } = require('express');
const router = Router();

const routerCreate = require('./createUser.js')

const routerDetail = require('./detailUser.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/**
 * lo envio a la ruta del user
 */
router.use('/user',routerCreate)

//ruta de detail
router.use('/userDetail', routerDetail)


module.exports = router;
