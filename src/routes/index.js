var express = require('express');
var router = express.Router();
var indexRouterCreate = require('../Post/router/index.js');
var categoriesRoute = require("../Categories/router/index")


/**
 * distribución de rutas
 */
router.use('/',indexRouterCreate)
router.use('/', categoriesRoute)

module.exports = router
