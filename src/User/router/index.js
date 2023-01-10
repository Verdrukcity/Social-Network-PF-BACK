const { Router } = require('express');
const router = Router();

const {verifyTokenAdmin} = require('../../middlewares');

const routerCreate = require('./createUser.js')
const routerUsersVerify = require('./usersVerify.js')

const routerDetail = require('./detailUser.js')
//Importamos la ruta del auth
const routerAuthUser = require('./authUser.js');

const routerAuthUserAuth0 = require('./auth0')

//importamos la ruta para editar el usuario
const routerUserEdit = require('./userEdit.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/**
 * lo envio a la ruta del user
 */
router.use('/user', routerCreate)

router.use('/usersverify', verifyTokenAdmin, routerUsersVerify)

//ruta de detail
router.use('/userDetail', routerDetail)

//Ruta de auth user
router.use('/authuser', routerAuthUser)

//ruta de auth user para auth0
router.use('/authuserAuth0', routerAuthUserAuth0)


//Ruta editar datos de usuario
router.use('/useredit', routerUserEdit)


module.exports = router;
