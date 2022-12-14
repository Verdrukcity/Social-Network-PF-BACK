const { Comment } = require('../../mongodb/models/Comment.js')
const { Post } = require('../../mongodb/models/Post.js')
const mongoose = require('mongoose');
const{
    Message_Incomplete_Create_Comentary ,
    Message_Error_Create_Comentary ,
    Message_Create_Comentary,
    

} = require( "../../Message")


// agregamos los servicios que queremos exportar
module.exports = {
    comments: async (req, res) => { // muestra todo los comment 
        try {
            const FIND_COMMENT = await Comment.find()
                res.json(FIND_COMMENT)
        } catch (error) {
            throw Error({error : error.message})
        }
    },

    createComment : async (req, res)=>{ // crea el comment
       try {
       const { id } = req.params;
       const { text, profileId} = req.body;
       if(!text || !profileId) throw Error({message : Message_Incomplete_Create_Comentary })

       const newPost = await Post.findById(id);
        if(!newPost) throw Error({message : Message_Error_Create_Comentary });

         const newCommen = await Comment.create(req.body)
          newPost.commentId.push(newCommen._id);
           newPost.save();

            res.status(200).json({data : Message_Create_Comentary})

       } catch (error) {
        res.status(400).send({message : error.message})
       }
    },

    detailComment :async (req, res)=>{ // muestra el detalle del comment
         try {
            const newComment = await Comment.findById(req.params.id).populate('profileId')
                res.status(200).json(newComment)           
         } catch (error) {
            res.status(400).send({message : error.message})
         }
    },
    deleteComment : async (req, res)=>{   //borrra el comment
       try {
        const { id } = req.params;
         const dropComment = await Comment.findByIdAndDelete(id);
         res.status(200).json(dropComment)
       } catch (error) {
        
       }
    }
}





