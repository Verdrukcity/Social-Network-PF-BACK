const express = require('express')
const router = express.Router()
const { findPost, makePost } = require('../services/createPost.service.js');
const Cloudinary = require("cloudinary").v2;


//aqui manejo las rutas del create

/**
 * trae todos los generos 
 * tipo : get
 * ruta : /create
 * no requiere de parametro alguno pero puede traer un query
 */

//                                      Search all || search by text || search by type
router.get("/", (req, res)=>{
    try {
        findPost(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})


router.post('/', (req, res) =>{
    try {
        makePost(req, res)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})




module.exports = router



