const { Like } = require("../../mongodb/models/Like.js");
const { Post } = require("../../mongodb/models/Post.js");
const { Profile } = require("../../mongodb/models/Profile.js");
const mongoose = require("mongoose");
const {
    Message_Error_No_Id,
    Message_Error_Find_Like,
    Message__Find_Like,
    Message_Error_Add_Like,
    Message_Add_Like,
} = require("../../Message");

// Agregamos los servicios que queremos exportar
module.exports = {
    likes: async (req, res) => {
        // Muestra todo los likes
        try {
            const FIND_LIKE = await Like.find().count();
            res.json({ message: Message__Find_Like, data: FIND_LIKE });
        } catch (error) {
            throw Error({ message: Message_Error_Find_Like });
        }
    },

    addLike: async (req, res) => {
        // Crea el like
        try {
            const { id } = req.params;
            const { usersLiked } = req.body;
            if (!id) throw Error({ message: Message_Error_No_Id });
            if (!usersLiked) throw Error({ message: Message_Error_Add_Like });

            const newPost = await Post.findById(id).populate("likes");
            const otroPost = await Post.findById(id);
            if (!newPost) throw Error({ message: Message_Error_Add_Like });

            const findUser = await Profile.findById(usersLiked)
            if(!findUser) throw Error({message: "User not found"})

            if (!newPost.likes.length) {
                const newLike = await Like.create(req.body);
                otroPost.likes.push(newLike._id);
                otroPost.save()

              return  res.status(200).json({ message: Message_Add_Like });
            }

            const likeMap = newPost.likes.find((like) => {
                // const findUser = await Profile.findById(like.usersLiked);
                //console.log(like.usersLiked.equals(findUser._id));
                return findUser._id.equals(like.usersLiked) === true
            });

            if(!likeMap){
                    const newLike = await Like.create(req.body);
                    otroPost.likes.push(newLike._id);
                    otroPost.save();
                    console.log({guarda : 'ok'})
                    return res.send("Like add");
                } else {
                    await Like.findByIdAndDelete(likeMap._id);

                    // indexLike = newPost.likes.findIndex(like => like.usersLiked !== findUser._id);

                    // newPost.likes.splice(indexLike,1)
                    
                    // newPost.save()
                    console.log({borra : 'delete'})
                    return res.send("Post unliked succesfully");
                }
                //return findUser

            // res.status(200).json({ message: Message_Add_Like });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
};
