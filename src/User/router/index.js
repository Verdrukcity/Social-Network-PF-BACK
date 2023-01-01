const { Router } = require('express');
const router = Router();

const routerCreate = require('./createUser.js')

const routerDetail = require('./detailUser.js')
//Importamos la ruta del auth
const routerAuthUser = require('./authUser.js')

//importamos la ruta para editar el usuario
const routerUserEdit = require('./userEdit.js')

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

//Ruta editar datos de usuario
router.use('/useredit', routerUserEdit)


module.exports = router;
