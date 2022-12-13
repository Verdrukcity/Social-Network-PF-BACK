const { model, Schema } = require('mongoose');
const { Follow } = require('./Follow');
const { Follower } = require('./Follower');
const { Mapa } = require('./mapas');
const { Post } = require('./Post');
const {validateEmail, validateAge} = require('./validations/index');

const PROFILE = new Schema({

    email : {
        type : String,
        required: function () {return validateEmail(this.email)}
        ,
        unique: true
    },
    user_Name :{
       type : String,
       required : true
    },
    name : {
        type : String,
        required : true
     },
    lastname : {
        type : String,
        required : true
     },
    image_profil : {
        type : String,
        required : true
     },
     image_publi_id :{
        type : String
     },
    birthdate : {
        type : String,
        required : function () {return validateAge(this.birthdate)}
     },
    country : {
        type : Schema.Types.ObjectId,
        ref : Mapa,
        required : true
     },
    content : [{
        type : Schema.Types.ObjectId,
        ref : Post
    }],
    follow :{
        type : Array,
        ref: Follow
    },
    followers : [{
        type : Schema.Types.ObjectId,
        ref : Follower
    }]
});

const Profile = model('Profile', PROFILE);
module.exports= {Profile};