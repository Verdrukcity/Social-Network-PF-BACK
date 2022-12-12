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
                        userData
                      
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
        const { postId } = req.params
        try{
            // //extraemos el id del post por params
            // const {postId} = req.params
            // //buscamos el post con el id requerido
            // const searchedPost = await Post.findById(postId)

            // //si es null, no existe tal post
            // if (searchedPost == null) throw new Error('No pudimos encontrar el post que buscas')
            // //de lo contrario, devolvemos el post obtenido
            // else res.json(searchedPost) 
            //const id = mongoose.Types.ObjectId(postId);
        //     let p = await Post.aggregate([
        //         {
        //         $match : {"_id" : id}
        //     },
        //     {
        //         $lookup : {
        //             from: "profiles",
        //             localField : 'userId',
        //             foreignField : '_id',
        //             as : 'profile'
        //         }
        //     },
        //     {
        //                 $graphLookup: {
        //                     from: "comments",
        //                     startWith: "$commentId",
        //                     connectFromField: "_id",
        //                     connectToField: "_id",
        //                     maxDepth: 2,
        //                     depthField: "numConnections",
        //                     as: "comentarios"
        //                 }
        //             },
        //             {
        //                 $unwind : '$comentarios'
        //             },
        //             {
        //                 $graphLookup: {
        //                     from: "profiles",
        //                     startWith: "$comentarios.profileId",
        //                     connectFromField: "_id",
        //                     connectToField: "_id",
        //                     maxDepth: 2,
        //                     depthField: "numConnections",
        //                     as: "usuarios"
        //                 }
        //             },
        //             {
        //                 $unwind : '$usuarios'
        //             },
        //         {$project : {userId:0, commentId : 0, profile : {content : 0}, usuarios : {content : 0}}}
        // ]);
        
        
        //join de la info de usuario con el userId contenido en el post
        //el segundo parametro le indica que solamente me traiga el nombre, imagen e ID
        let post = await Post.findById(postId).populate('userId', {
            user_Name: 1,
            image_profil: 1,
            _id: 1
        })

        //join de la info de comentarios con el commentId contenido en el post
        post = await post.populate( 'commentId')
        
        //aca estan los comentarios del post, solamente con el id del usuario que comento
        let coments = post.commentId
        //obtengo un array de promesas, que va a ir buscando la info de cada usuario con el profileId que hay en cada comentario
        let comentUserPromises = coments.map( com => com.populate('profileId', {
           user_Name: 1,
           image_profil: 1,
           _id: 1
        }))
        //obtenemos la info completa de los comentarios con el usuario que lo realizó
        let comentsUsers = await Promise.all(comentUserPromises)

        //objeto que va a enviar como respuesta
        let postData = {
            post:{
                text: post.text,
                multimedia: post.multimedia,
                multimedia_id: post.multimedia_id,
                category: post.category
            },
            userId: post.userId,
            comments: comentsUsers
        }

        res.status(200).json(postData)
        // if(p.length){
        //     let data = p[0]
        //     const arr = {
        //         userId : data.profile[0],
        //         post : {
        //             _id : data._id,
        //             text : data.text,
        //             multimedia : data.multimedia,
        //             multimedia_id : data.multimedia_id,
        //             category : data.category
        //         },
        //         comment : p.map((x) =>{
        //             return{
        //                 comment : x.comentarios && x.comentarios,
        //                 user : x.usuarios && x.usuarios
        //             }
        //         })    
        //     }
        //     return res.status(200).json(arr)
        // }
    
        // else if(!p.length){
        //     p = await Post.findById(postId).populate(['userId', 'commentId']);
        //        res.status(200).json(p)
        //  } 
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