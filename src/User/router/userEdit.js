const express = require('express');
const { userEdit } = require('../services/User.service');
const router = express.Router()

router.post('/:id', (req, res)=>{
    try {
        userEdit(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


module.exports = router;