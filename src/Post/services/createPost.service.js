const axios = require('axios');
const { Post } = require("../../mongodb/models/Post.js");
require('dotenv').config();
const {
    API_KEY
} = process.env;

// agregamos los servicios que queremos exportar
module.exports = {
    findPost: async (req, res) => {
        try {
            const {type, text,  } =req.query
            if(type ||text ){
                const FIND_POSTS = await Post.find({type, text, })
                res.json(FIND_POSTS)
            } else{
                const POSTS = await Post.find({})
                res.json({data:POSTS, message: "Todo ok"})  
            }
        } catch (error) {
            throw Error(error.message)
        }
    },
    makePost: async (req, res) => {
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
                throw Error({ message: "no se suministraron los datos requeridos" })
            }
    
        } catch (error) {
            throw Error({ message: error.message })
        }
    
    }

}