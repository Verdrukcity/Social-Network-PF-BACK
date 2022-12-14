const { Router } = require('express');
const router = Router();

const routerCreate = require('./createUser.js')

const routerDetail = require('./detailUser.js')
//Importamos la ruta del auth
const routerAuthUser = require('./authUser.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/**
 * lo envio a la ruta del user
 */
router.use('/user',routerCreate)

//ruta de detail
router.use('/userDetail', routerDetail)

//Ruta de auth user
router.use('/authuser', routerAuthUser)


module.exports = router;
