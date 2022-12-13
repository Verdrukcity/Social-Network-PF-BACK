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
            if (!newPost) throw Error({ message: Message_Error_Add_Like });

            //const findUser = await Profile.findById(usersLiked)
            //if(!findUser) throw Error({message: "User not found"})

            /*console.log(newPost);

            if (newPost.likes.length === 0) {
                const newLike = await Like.create(req.body);
                newPost.likes.push(newLike._id);
                newPost.save();
                res.status(200).json({ message: Message_Add_Like });
            }

            const likeMap = newPost.likes.map(async (like) => {
                const findUser = await Profile.findById(like.usersLiked);
                console.log(like, "user");
                if (!findUser) {
                    const newLike = await Like.create(req.body);
                    newPost.likes.push(newLike._id);
                    newPost.save();
                    return "Like add";
                } else if (findUser) {
                    const deleteLike = await Like.findByIdAndDelete(like._id);
                    return "Like delete";
                }
                //return findUser
            });
            */

            res.status(200).json({ message: Message_Add_Like });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
};
