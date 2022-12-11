const { Router } = require('express');

const router = Router();
const routerCreate = require('./createComment.js')

const routerDetail = require('./detailComment.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/**
 * lo envio a la ruta del create
 */
router.use('/comment',routerCreate);

//ruta de detail
router.use('/detailComment',routerDetail);



module.exports = router;
