
const { createImg } = require("../../cloudinary/index.js");
const { Post } = require("../../mongodb/models/Post.js")



// agregamos los servicios que queremos exportar
module.exports = {
    findPost: async (req, res) => {
        try {
            const { type, text, } = req.query
            if (type || text) {
                const FIND_POSTS = await Post.find({ type, text, })
                res.json(FIND_POSTS)
            } else {
                const POSTS = await Post.find({})
                res.json({message:"todo ok " , data:POSTS})
            }
        } catch (error) {
            throw Error({error:error.message})
        }
    },
    makePost: async (req, res) => {
        try {
            const { multimedia } = req.files;     //require the multimedia file and the text from the body
            const { text, type } = req.body;

            if (multimedia || text) {

                const IMG = createImg(multimedia.tempFilePath)   //we upload the image or the video and save the information

                const data = {
                    text,
                    type,
                    multimedia: IMG.url ? IMG.url : "",
                    multimedia_id: IMG.public_id ? IMG.public_id : ""
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
            throw Error( {error: error.message} )
        }

    },
    detailPost: async(req, res)=>{
        try{
            //extraemos el id del post por params
            const {postId} = req.params
            //buscamos el post con el id requerido
            const searchedPost = await Post.findById(postId)

            //si es null, no existe tal post
            if (searchedPost == null) throw new Error('No pudimos encontrar el post que buscas')
            //de lo contrario, devolvemos el post obtenido
            else res.json(searchedPost) 
        }
        catch(error){
            res.status(400).send(error.message)
        }
    }

}