
const { createImg, delImg } = require("../../cloudinary/index.js");
const { Post } = require("../../mongodb/models/Post.js");
const { Profile } = require("../../mongodb/models/Profile.js");



// agregamos los servicios que queremos exportar
module.exports = {
    findPost: async (req, res) => {
        try {
            const { type, text, } = req.query
            if (type || text) {
                const FIND_POSTS = await Post.find({ type, text, }).populate(['userId', 'commentId'])
                res.json(FIND_POSTS)
            } else {
                const POSTS = await Post.find({}).populate(['userId', 'commentId'])
                res.json({message:"todo ok " , data:POSTS})
            }
        } catch (error) {
            throw Error(error.message)
        }
    },
    makePost: async (req, res) => {
        try {
            const { multimedia } = req.files;     //require the multimedia file and the text from the body
            const { text, category } = req.body;
            const { id } = req.params

            if (multimedia && text  && category) {

                    const IMG = await createImg(multimedia); 
                  //we upload the image or the video and save the information
                const data = {
                    text,
                    userId : id,
                    category: category,
                    multimedia: IMG.url ? IMG.url : "",
                    multimedia_id: IMG.public_id ? IMG.public_id : ""
                };

                //We save the post on the DB
                const POST = await Post.create(data);

                    const newProfile = await Profile.findById(id);
                await newProfile.content.push(POST._id);
                await newProfile.save();
               
                
                res.status(200).json({
                    message: "los datos se guardaron correctamente",
                    data: {...POST._doc,
                    category: category},
                    profile: newProfile
                });
            } else {
                throw Error({ message: "no se suministraron los datos requeridos" })
            }

        } catch (error) {
            throw Error(  error.message )
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
    },
    deletePost : async (req, res)=>{
        try {
            const { id } = req.params;
            const postDelete  = await Post.findByIdAndDelete(id);
           if(!postDelete) throw new Error({message : 'No existe comment'})
              delImg(postDelete.multimedia_id)
              res.status(200).json({data : 'se elimino correctamente'})

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}