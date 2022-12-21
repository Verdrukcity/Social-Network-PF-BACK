const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { schemaLoggin } = require("../../mongodb/models/validations");
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
    authUser: async (req, res) => {
        try {
            //valido si vine la data como se requeire
            const { error } = schemaLoggin.validate(req.body)
            
            //si no son los datos ue me pasan del front mando error 
            if (error) {
                return res.status(400).json(
                    {error: error.details[0].message}
                    )
                }
                
                
            //busco el USUARIO en la db
            const user = await Profile.findOne({ user_Name: req.body.userName });
            if (!user) return res.status(404).json({ error: Message_Error_Auth_User});

            // hash contraseña funcion para hashear 
            // const salt = await bcrypt.genSalt(10);
            // const password = await bcrypt.hash(req.body.password, salt);

            //compara y hashea la contraseña para mandar el token 
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(404).json({ error: Message_Error_Auth_Password });


            // create token
            const token = jwt.sign({
                userName: user.user_Name,
                id: user._id
            }, TOKEN_SECRET)
    
            
            res.header('auth-token', token).json({
                message: Message_Auth_User,
                data: {token, id:user._id}
            })

            
            // res.status(200).json({
            //     message: Message_Auth_User,
            // });

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
