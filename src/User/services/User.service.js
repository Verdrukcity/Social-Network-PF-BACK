const { Profile } = require("../../mongodb/models/Profile");
const mongoose = require("mongoose");
const {
    Message_Error_Create_User,
    Message_Error_Find_User,
    Message_Error_Not_Minimum_Age,
    Message_User_Update,
    Message_Error_Id,
    Message_Error_Username,
    Message_Error_Image_Profile,
    Message_Error_Password,
} = require("../../Message");

module.exports = {
    createUser: async (req, res) => {
        try {
            const {
                email,
                user_Name,
                name,
                lastname,
                birthdate,
                country,
                password,
            } = req.body;

            if (
                !email ||
                !user_Name ||
                !name ||
                !lastname ||
                !birthdate ||
                !country ||
                !password
            )
                throw Error(Message_Error_Create_User);

            let dateNow = new Date();
            let datedMinus = dateNow.getTime() - 567648000000;
            let dateMinimumAge = new Date(datedMinus);

            if (!Date.parse(dateMinimumAge) >= Date.parse(birthdate))
                throw Error(Message_Error_Not_Minimum_Age);

            const newProfil = await Profile.create(req.body);
            res.status(200).json(newProfil);
        } catch (error) {
            res.status(400).json(error.message);
        }
    },

    users: async (req, res) => {
        try {
            const newPerfil = await Profile.aggregate([
                {
                    $match: req.query, // puede buscar por query la refrencia, si no tiene qury llegaran todos los profiles
                }, // la ruta es user - no puede tener la ruta sucia si no va a buscar  los profile
                {
                    // si la ruta llega asi - /user?name='', manda un error ojoooo
                    $lookup: {
                        from: "mapas",
                        localField: "country",
                        foreignField: "_id",
                        as: "country",
                    },
                },
                {
                    $unwind: "$country",
                },
                {
                    $lookup: {
                        from: "posts",
                        let: { image: "$content" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$_id", "$$image"],
                                    },
                                },
                            },
                        ],
                        as: "posts",
                    },
                },
                {
                    $project: { content: 0 },
                },
            ]);
            if (!newPerfil.length) throw Error(Message_Error_Find_User);
            res.status(200).json(newPerfil);
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
    userId: async (req, res) => {
        try {
            const { id } = req.query;
            console.log("db", id);
            if (id) {
                let id1 = mongoose.Types.ObjectId(id);

                var newProfile = await Profile.findById(id).select([
                    "user_Name",
                    "_id",
                    "image_profil",
                    "country",
                    "content",
                    "followers",
                    "follow",
                ]);

                newProfile = await Profile.aggregate([
                    {
                        $match: { _id: id1 },
                    },
                    {
                        $lookup: {
                            from: "mapas",
                            localField: "country",
                            foreignField: "_id",
                            as: "country",
                        },
                    },
                    {
                        $unwind: "$country",
                    },
                    {
                        $lookup: {
                            from: "posts",
                            localField: "content",
                            foreignField: "_id",
                            as: "contents",
                        },
                    },
                    {
                        $project: { content: 0 },
                    },
                ]);

                res.status(200).send(newProfile[0]);
            } else {
                res.status(400).json({ message: Message_Error_Create_User });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
    userEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { user_Name, image_profil, password } = req.body;

            if (!id) throw Error(Message_Error_Id);
            if (!user_Name) throw Error(Message_Error_Username);
            if (!image_profil) throw new Error(Message_Error_Image_Profile);
            if (!password) throw new Error(Message_Error_Password);

            const user = await Profile.findById(id);
            const filter = { _id: id };
            const update = { user_Name, image_profil, password };

            let userUpdate = await Profile.findOneAndUpdate(filter, update, {
                returnOriginal: false,
            });

            res.status(200).json({
                message: Message_User_Update,
                data: userUpdate,
            });
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
};
