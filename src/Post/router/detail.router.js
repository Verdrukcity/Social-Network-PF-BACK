const express = require('express')
const router = express.Router()
const {detailPost, deletePost} = require('../services/Post.service') //traemos la lógica de services

const { Post } = require('../../mongodb/models/Post.js')

router.get('/:postId',async (req, res)=>{
    try{
        detailPost(req, res)
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

router.delete('/:id', (req, res)=>{
    try {
        deletePost(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
})
module.exports = router