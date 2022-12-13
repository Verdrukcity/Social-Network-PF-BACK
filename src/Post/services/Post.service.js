const { createImg, delImg } = require("../../cloudinary/index.js");
const { Post } = require("../../mongodb/models/Post.js");
const { Profile } = require("../../mongodb/models/Profile.js");
const mongoose = require("mongoose");

const {
    Message_Create_Post,
    Message_Error_Delete_Post,
} = require("../../Message");

// agregamos los servicios que queremos exportar
module.exports = {
    findPost: async (req, res) => {
        try {
            const { category, text } = req.query;
            const { id } = req.body;
            if (category || text) {
                const FIND_POSTS = await Post.find({ type, text }).populate([
                    "userId",
                    "commentId",
                ]);
                res.json(FIND_POSTS);
            }
            if (id) {
                const POST = await Post.findById(id).populate([
                    "userId",
                    "commentId",
                ]);
                res.json(POST);
            } else {
                const POSTS = await Post.find({}).populate([
                    "userId",
                    "commentId",
                ]);
                const INFO = [];
                for (const iterator of POSTS) {
                    //use a for method, because .map doasen't work
                    const uId = mongoose.Types.ObjectId(iterator.userId); //conver the id on something that mongoores recognice
                    const userData = await Profile.findById(uId); //find the profile
                    INFO.push({
                        ...iterator._doc,
                        userData,
                    });
                }
                res.json({ message: "todo ok ", data: INFO });
            }
        } catch (error) {
            throw Error(error.message);
        }
    },
    makePost: async (req, res) => {
        try {
            const { multimedia } = req.files; //require the multimedia file and the text from the body
            const { text, category } = req.body;
            const { id } = req.params;

            if (multimedia && text && category) {
                const IMG = await createImg(multimedia);
                //we upload the image or the video and save the information
                const data = {
                    text,
                    userId: id,
                    category: category,
                    multimedia: IMG.url ? IMG.url : "",
                    multimedia_id: IMG.public_id ? IMG.public_id : "",
                };

                //We save the post on the DB
                const POST = await Post.create(data);

                const newProfile = await Profile.findById(id);
                await newProfile.content.push(POST._id);
                await newProfile.save();

                res.status(200).json({
                    message: Message_Create_Post,
                    data: { ...POST._doc },
                    profile: {
                        _id: newProfile._id,
                        user_Name: newProfile.user_Name,
                        image_profil: newProfile.image_profil,
                    },
                });
            } else {
                throw Error(Message_Imcomplete_Create_Post);
            }
        } catch (error) {
            throw Error(error.message);
        }
    },
    detailPost: async (req, res) => {
        const { postId } = req.params;
        try {
            //join de la info de usuario con el userId contenido en el post
            //el segundo parametro le indica que solamente me traiga el nombre, imagen e ID
            let post = await Post.findById(postId).populate("userId", {
                user_Name: 1,
                image_profil: 1,
                _id: 1,
            }).populate("likes")

            //join de la info de comentarios con el commentId contenido en el post
            post = await post.populate("commentId");

            //aca estan los comentarios del post, solamente con el id del usuario que comento
            let coments = post.commentId;
            //obtengo un array de promesas, que va a ir buscando la info de cada usuario con el profileId que hay en cada comentario
            let comentUserPromises = coments.map((com) =>
                com.populate("profileId", {
                    user_Name: 1,
                    image_profil: 1,
                    _id: 1,
                })
            );
            //obtenemos la info completa de los comentarios con el usuario que lo realizó
            let comentsUsers = await Promise.all(comentUserPromises);

            //objeto que va a enviar como respuesta
            let postData = {
                post: {
                    text: post.text,
                    multimedia: post.multimedia,
                    multimedia_id: post.multimedia_id,
                    category: post.category,
                    likes: post.likes,
                },
                userId: post.userId,
                comments: comentsUsers,
            };

            res.status(200).json(postData);

        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const postDelete = await Post.findByIdAndDelete(id);
            if (!postDelete) throw new Error(Message_Error_Delete_Post);
            delImg(postDelete.multimedia_id);
            res.status(200).json({ data: Message_Delete_Post });
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
};
