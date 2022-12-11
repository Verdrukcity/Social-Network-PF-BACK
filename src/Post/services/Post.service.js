
const { createImg, delImg } = require("../../cloudinary/index.js");
const { Post } = require("../../mongodb/models/Post.js");
const { Profile } = require("../../mongodb/models/Profile.js");
const mongoose = require("mongoose")



// agregamos los servicios que queremos exportar
module.exports = {
    findPost: async (req, res) => {
        try {
            const { category, text, } = req.query;
            const{id} = req.body;
            if (category || text) {
                const FIND_POSTS = await Post.find({ type, text, })
                res.json(FIND_POSTS)
            } 
            if(id){
                const POST = await Post.findById(id);
                res.json(POST)
            } else{
                const POSTS = await Post.find({})
                const INFO = []
                for (const iterator of POSTS) {                             //use a for method, because .map doasen't work
                    const uId = mongoose.Types.ObjectId(iterator.userId);   //conver the id on something that mongoores recognice
                    const userData = await Profile.findById(uId);       //find the profile
                    INFO.push({
                        ...iterator._doc,
                        userData: {
                            _id: userData._id,
                            user_Name: userData.user_Name,
                            image_profil: userData.image_profil,
                        }
                    })
                }
                res.json({message:"todo ok " , data:INFO})
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
                    data: {...POST._doc},
                    profile: {
                        _id:newProfile._id,
                        user_Name: newProfile.user_Name,
                        image_profil: newProfile.image_profil
                    }
                });
            } else {
                throw Error( "no se suministraron los datos requeridos" )
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
           if(!postDelete) throw new Error('No existe comment')
              delImg(postDelete.multimedia_id)
              res.status(200).json({data : 'se elimino correctamente'})

        } catch (error) {
            res.status(400).json(error.message)
        }
    }
}