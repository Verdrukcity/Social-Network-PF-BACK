var express = require('express');
var router = express.Router();
var indexRouterCreate = require('../Post/router/index.js');
var categoriesRoute = require("../Categories/router/index")
var CommentCreate = require("../Comment/router/index.js")

/**
 * distribución de rutas
 */
router.use('/',indexRouterCreate)
router.use('/', categoriesRoute)
router.use('/', CommentCreate)

module.exports = router
