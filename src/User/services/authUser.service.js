const { Profile } = require("../../mongodb/models/Profile");
const mongoose = require("mongoose");
const {
    Message_Auth_User,
    Message_Auth_User_Default,
    Message_Error_Auth_User,
    Message_Error_Auth_User_Default,
} = require("../../Message");

module.exports = {
    authUser: async (req, res) => {
        try {
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
