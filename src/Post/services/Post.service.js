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
                const FIND_POSTS = await Post.find({ type, text, }).populate(['userId', 'commentId'])
                res.json(FIND_POSTS)
            } 
            if(id){
                const POST = await Post.findById(id).populate(['userId', 'commentId'])
                res.json(POST)
            } else{
                const POSTS = await Post.find({}).populate(['userId', 'commentId'])
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
                    data: {...POST._doc,
                    category: JSON.parse(POST.category)},
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
            // //extraemos el id del post por params
            // const {postId} = req.params
            // //buscamos el post con el id requerido
            // const searchedPost = await Post.findById(postId)

            // //si es null, no existe tal post
            // if (searchedPost == null) throw new Error('No pudimos encontrar el post que buscas')
            // //de lo contrario, devolvemos el post obtenido
            // else res.json(searchedPost) 
            const { postId } = req.params
            const id = mongoose.Types.ObjectId(postId);
            let p = await Post.aggregate([
                {
                $match : {"_id" : id}
            },
            {
                $lookup : {
                    from: "profiles",
                    localField : 'userId',
                    foreignField : '_id',
                    as : 'profile'
                }
            },
            {
                        $graphLookup: {
                            from: "comments",
                            startWith: "$commentId",
                            connectFromField: "_id",
                            connectToField: "_id",
                            maxDepth: 2,
                            depthField: "numConnections",
                            as: "comentarios"
                        }
                    },
                    {
                        $unwind : '$comentarios'
                    },
                    {
                        $graphLookup: {
                            from: "profiles",
                            startWith: "$comentarios.profileId",
                            connectFromField: "_id",
                            connectToField: "_id",
                            maxDepth: 2,
                            depthField: "numConnections",
                            as: "usuarios"
                        }
                    },
                    {
                        $unwind : '$usuarios'
                    },
                {$project : {userId:0, commentId : 0, profile : {content : 0}, usuarios : {content : 0}}}
        ]);
        if(p.length){
            const arr = {
                userId : p[0].profile,
                post : {
                    _id : p[0]._id,
                    text : p[0].text,
                    multimedia : p[0].multimedia,
                    multimedia_id : p[0].multimedia_id,
                    category : p[0].category
                },
                comment : p.map((x) =>{
                    return{
                        comment : x.comentarios && x.comentarios,
                        user : x.usuarios && x.usuarios
                    }
                })    
            }
            return res.status(200).json(arr)
        }
    
        if(!p.length){
            p = await Post.findById(postId).populate(['userId', 'commentId']);
               res.status(200).json(p)
         } 
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