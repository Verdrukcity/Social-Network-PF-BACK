const { model, Schema } = require("mongoose");
const { Follow } = require("./Follow");
const { Follower } = require("./Follower");
const { Mapa } = require("./mapas");
const { Post } = require("./Post");
const { validateEmail, validateAge } = require("./validations/index");
var uniqueValidator = require("mongoose-unique-validator");

const PROFILE = new Schema({
    email: {
        type: String,
        required: function () {
            return validateEmail(this.email);
        },
        unique: {
            value: true,
            message: "Email repetido",
        },
    },
    user_Name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    image_profil: {
        type: String,
        default:
            "https://res.cloudinary.com/dlr95phqw/image/upload/w_400/v1/red%20social_image/fpv8bltjmxw0udb4utuf",
        //será necesario agregar una imagen por defecto
    },
    image_publi_id: {
        type: String,
    },
    birthdate: {
        type: String,
        required: function () {
            return validateAge(this.birthdate);
        },
    },
    status :{
        type : Boolean,
        default : true 
    },
    role : {
        type : String,
        default : "user",
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: Mapa,
        required: true,
    },
    content: [
        {
            type: Schema.Types.ObjectId,
            ref: Post,
        },
    ],
    follow: {
        type: Array,
        ref: Follow,
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: Follower,
        },
    ],
    userStripe: {
        type: String,
    },
    auth0: {
        type: Boolean,
        default: false
    }
});

//Mensaje personalizado para avisar cual es el problema
PROFILE.plugin(uniqueValidator, {
    message: `El ${this.PATH} ingresado ya se encuentra en uso`,
});

const Profile = model("Profile", PROFILE);
module.exports = { Profile };
