var express = require('express');
var router = express.Router();
var indexRouterCreate = require('../c-createPost/router/index');



/**
 * ruta de creacion de post 
 */
router.use('/',indexRouterCreate)


router.get('/', function(req, res, next) {
  res.send("Hello, world! Aqui armamos nuestras rutas 1");
});


module.exports = router;
