const { Comment } = require('../../mongodb/models/Comment.js')
const { Post } = require('../../mongodb/models/Post.js')
const mongoose = require('mongoose');

// agregamos los servicios que queremos exportar
module.exports = {
    comments: async (req, res) => {
        try {
            const FIND_COMMENT = await Comment.find()
                res.json(FIND_COMMENT)
        } catch (error) {
            throw Error({error : error.message})
        }
    },

    createComment : async (req, res)=>{
       try {
       const { id } = req.params;
       const { text, profileId} = req.body;
       if(!text || !profileId) throw Error({message : 'Faltan parametros'})

       const newPost = await Post.findById(id);
        if(!newPost) throw Error({message : 'No existe Post al que quire comentar'});

         const newCommen = await Comment.create(req.body)
          newPost.commentId.push(newCommen._id);
           newPost.save();

            res.status(200).json({data : 'se creo correctamente el commentario'})

       } catch (error) {
        res.status(400).send({message : error.message})
       }
    },

    detailComment :async (req, res)=>{
         try {
            const newComment = await Comment.findById(req.params.id).populate('profileId')
                res.status(200).json(newComment)           
         } catch (error) {
            res.status(400).send({message : error.message})
         }
    }
}