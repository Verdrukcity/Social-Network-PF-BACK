var express = require('express');
var router = express.Router();
var indexRouterCreate = require('../Post/router/index.js');
var categoriesRoute = require("../Categories/router/index");
const user = require('../User/router/index.js');
const comment = require('../Comment/router/index.js');
/**
 * distribución de rutas
 */
router.use('/',indexRouterCreate);
router.use('/', categoriesRoute);
router.use('/', user);
router.use('/', comment);
module.exports = router
