const mongoose = require("mongoose");
const { Profile } = require("../../mongodb/models/Profile");
require('dotenv').config()
const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = process.env;


const {
    Message_Auth_User,
    Message_Auth_User_Default,
    Message_Error_Auth_User,
    Message_Error_Auth_User_Default,
    Message_Error_Auth_Password,
} = require("../../Message");


module.exports = {
    authUser2: async function (req, res) {
        try {
            if(!req.body.email) res.status(400).send(Message_Error_Auth_User);
            const user = await Profile.findOne({ email: req.body.email })

            const token = jwt.sign({
                userName: user.email,
                id: user._id,
                role: user.role,
                status: user.status,
            }, TOKEN_SECRET)

            res.json({
                message: Message_Auth_User,
                data: {token, id:user._id}
            })

            
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    
    }
}