const { createImg, delImg } = require("../../cloudinary/index.js");
const { Post } = require("../../mongodb/models/Post.js");
const { Profile } = require("../../mongodb/models/Profile.js");
const mongoose = require("mongoose");

const {
    Message_Create_Post,
    Message_Error_Delete_Post,
    Message_Find_All_Posts,
    Message_Error_Find_All_Posts,
} = require("../../Message");

// agregamos los servicios que queremos exportar
module.exports = {
    findPost: async (req, res) => {
        try {
            const { category, text } = req.query;
            const { id } = req.body;
            if (category || text) {
                const FIND_POSTS = await Post.find({ type, text }).populate("userId",{
                    _id: 1,
                    user_Name: 1,
                    image_profil: 1
                });
                res.json(FIND_POSTS);
            }
            if (id) {
                const POST = await Post.findById(id).populate("userId",{
                    _id: 1,
                    user_Name: 1,
                    image_profil: 1
                });
                res.json(POST);
            } else {
                const POSTS = await Post.find({}).populate("userId", {
                    _id: 1,
                    user_Name: 1,
                    image_profil: 1
                });

                //COMENTO ESTO PORQUE HACE LO MISMO QUE EL POPULATE DE ARRIBA
                //const INFO = [];
                // for (const iterator of POSTS) {
                //     //use a for method, because .map doasen't work
                //     const uId = mongoose.Types.ObjectId(iterator.userId); //conver the id on something that mongoores recognice
                //     const userData = await Profile.findById(uId); //find the profile

                //     const allData = {
                //         _id: iterator._doc._id,
                //         text: iterator._doc.text,
                //         multimedia: iterator._doc.multimedia,
                //         multimedia_id: iterator._doc.multimedia_id,
                //         category: iterator._doc.category,
                //         userId: iterator._doc.userId,
                //         commentId: iterator._doc.commentId,
                //         likes: iterator._doc.likes.length,
                //     };

                //     INFO.push({
                //         ...allData,
                //         userData,
                //     });
                // }
                res.json({ message: Message_Find_All_Posts, data: POSTS });
            }
        } catch (error) {
            throw Error({ message: Message_Error_Find_All_Posts });
        }
    },
    makePost: async (req, res) => {
        try {
            const { multimedia } = req.files; //require the multimedia file and the text from the body
            const { text, category } = req.body;
            const { id } = req.params;

            if (multimedia && text && category) {
                const multimed = await createImg(multimedia);
                //we upload the image or the video and save the information
                const data = {
                    text,
                    userId: id,
                    category: category,
                    multimedia: multimed.url ? multimed.url : "",
                    multimedia_id: multimed.public_id ? multimed.public_id : "",
                    multimediaFullSize: multimed.urlFullSize? multimed.urlFullSize: "",
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
            let post = await Post.findById(postId)
                .populate("userId", {
                    user_Name: 1,
                    image_profil: 1,
                    _id: 1,
                })
                .populate("likes");

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

            const likesMap = post.likes.map(async (user) => {
                const likeProfiles = await Profile.findById(user.usersLiked);
                return {
                    _id: likeProfiles._id,
                    user_Name: likeProfiles.user_Name,
                    image_profil: likeProfiles.image_profil,
                }
            });

            const likesUsers = await Promise.all(likesMap)

            //objeto que va a enviar como respuesta
            let postData = {
                post: {
                    text: post.text,
                    multimedia: post.multimedia,
                    multimedia_id: post.multimedia_id,
                    category: post.category,
                    likes: likesUsers,
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
