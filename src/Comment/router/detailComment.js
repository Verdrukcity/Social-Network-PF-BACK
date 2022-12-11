const express = require('express')
const router = express.Router()
const { detailComment, deleteComment } = require('../services/Comment.service.js')

router.get('/:id', (req, res)=>{
    try{
        detailComment(req, res)
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

router.delete('/:id', (req, res)=>{
    try {
        deleteComment(req, res)
    } catch (error) {
        res.status(400).json(error.message)
    }
})
module.exports = router