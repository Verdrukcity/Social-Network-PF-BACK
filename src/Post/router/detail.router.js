const mongoose = require('mongoose');

const express = require('express')
const router = express.Router()
const {detailPost, deletePost} = require('../services/Post.service') //traemos la lógica de services

const { Post } = require('../../mongodb/models/Post.js')

router.get('/:postId',async (req, res)=>{
    try{
        const { postId } = req.params
        // detailPost(req, res)
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
    // if(!p.length) p = Post.findById(postId);

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
       res.status(200).json(arr)
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

router.delete('/:id', (req, res)=>{
    try {
        deletePost(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
})
module.exports = router