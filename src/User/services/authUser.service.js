const { Profile } = require("../../mongodb/models/Profile");
const mongoose = require("mongoose");
const {
    Message_Auth_User,
    Message_Auth_User_Default,
    Message_Error_Auth_User,
    Message_Error_Auth_User_Default,
} = require("../../Message");
const { schemaLoggin } = require("../../mongodb/models/validations");




module.exports = {
    authUser: async (req, res) => {
        try {
            
            const { error } = schemaLoggin.validate(req.body)
            const user = await Profile.findOne({ user_Name: req.body.userName });
            const password = await Profile.findOne({ password: req.body.password });

            if (error) {
                return res.status(400).json(
                    {error: error.details[0].message}
                )
            }

            if (!user) return res.status(404).json({ error: Message_Error_Auth_User_Default });
            if (!password) return res.status(404).json({ error: Message_Error_Auth_User_Default});

            
            res.status(200).json({
                message: Message_Auth_User,
                data: "No data",
            });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    userDefault: async (req, res) => {
        try {
            res.status(200).json({ message: Message_Auth_User_Default, data: "No data" });
        } catch (error) {
            throw Error({ message: error.message });
        }
    },
};
