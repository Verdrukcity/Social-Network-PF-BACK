const express = require('express');
const { userId } = require('../services/User.service');
const router = express.Router()

router.get('/', (req, res)=>{
    try {
        userId(req, res)
    } catch (error) {
        res.status(400).json(error.message)
    }
})


module.exports = router;