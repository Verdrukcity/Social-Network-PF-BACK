const express = require('express');
const { createMaps } = require('../services/mapServices');
const router = express.Router()

router.get('/', (req, res)=>{
   createMaps(req, res)
});

module.exports = router;