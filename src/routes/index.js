const express = require('express');
const router = express.Router();
const indexRouterCreate = require('../Post/router/index.js');
const categoriesRoute = require("../Categories/router/index");
const user = require('../User/router/index.js');
const comment = require('../Comment/router/index.js');
const MAPA = require('../mapas/router/index.js');
const Like = require('../Likes/route/index')
const Pago=require('../Pago/router/index')
const stripeRoutes = require("../Stripe/routes/index.js")
const mail = require ('../Mails/route/index.js')
const admin = require('../Admin/router/index.js')
/**
 * distribución de rutas
 */
router.use('/',indexRouterCreate);
router.use('/', categoriesRoute);
router.use('/', user);
router.use('/', comment);
router.use('/', MAPA)
router.use('/', Like )
router.use('/',Pago)
router.use('/', stripeRoutes );

module.exports = router
