const express = require('express')
const router = express.Router()
const {detailPost} = require('../services/Post.service') //traemos la lógica de services

router.get('/:postId', (req, res)=>{
    try{
        detailPost(req, res)
    }
    catch(error){
        res.status(400).json(error.message)
    }
})


module.exports = router