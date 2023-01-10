const mongoose = require("mongoose");
const { Profile } = require("../../mongodb/models/Profile");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            const {email,family_name, given_name, nickname, picture } = req.body;

            if(!email) return res.status(400).send(Message_Error_Auth_User);
            const user = await Profile.findOne({ email: req.body.email });
            if(!user){ 
            let dateNow = new Date();
            let datedMinus = dateNow.getTime() - 567648000000;
            let dateMinimumAge = new Date(datedMinus);
            const country = mongoose.Types.ObjectId("639ce349aa3c55a1a9dd17c1");
            const hash = await bcrypt.hash(email, 10);
            const data = {
                email,
            user_Name: nickname,
            name: family_name,
            lastname: given_name,
            birthdate: dateMinimumAge,
            country,
            image_profil: picture,
            password: hash,
            auth0: true
            }
            const newProfil = await Profile.create(data);
            const token = jwt.sign({
                userName: newProfil.email ,
                id: newProfil._id ,
                role: newProfil.role ,
                status: newProfil.status ,
            }, TOKEN_SECRET)

             res.json({
                message: "Usuario logueado y creado correctamente",
                data: {token, id:newProfil._id}
            })
            } else {
            const token = jwt.sign({
                userName: user.email ,
                id: user._id ,
                role: user.role ,
                status: user.status ,
            }, TOKEN_SECRET)

            res.json({
                message: Message_Auth_User,
                data: {token, id:user._id}
            })}

            
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    
    }
}