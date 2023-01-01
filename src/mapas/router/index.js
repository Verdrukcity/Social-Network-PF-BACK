const { Router } = require('express');

const router = Router();

const routerMaps = require('./createMaps.js')

router.use('/maps', routerMaps);

module.exports = router;
