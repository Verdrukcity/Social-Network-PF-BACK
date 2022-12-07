const express = require('express')
const router = express.Router()
const { Post } = require("../../mongodb/models/Post.js")
const Cloudinary = require("cloudinary").v2;


//aqui manejo las rutas del create

/**
 * trae todos los generos 
 * tipo : post
 * ruta : /create
 * no requiere de parametro alguno 
 */

//                                      Search all || search by text || search by type
router.get("/", async (req, res) => {
    try {
        const {type, text,  } =req.query
        if(type ||text ){
            const FIND_POSTS = await Post.find({type, text, })
            res.json(FIND_POSTS)
        } else{
            const POSTS = await Post.find({})
            res.json(POSTS)  
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})


router.post('/', async (req, res) => {
    try {
        const { multimedia } = req.files;     //require the multimedia file and the text from the body
        const { text, type } = req.body;

        if (multimedia || text) {

                const IMG = await Cloudinary.uploader.upload(multimedia.tempFilePath);   //we upload the image or the video and save the information

            const data = {
                text,
                type,
                multimedia: IMG.url?IMG.url : "" ,
                multimedia_id: IMG.public_id? IMG.public_id : "" 
            }

            //We save the post on the DB
            const POST = await Post.create(data)

            res.status(200).json({
                message: "los datos se guardaron correctamente",
                data: POST
            })
        } else {
            res.status(400).json({ message: "no se suministraron los datos requeridos" })
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})




module.exports = router



