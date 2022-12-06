const { model, Schema } = require('mongoose');
const { Follow } = require('./Follow');
const { Follower } = require('./Follower');
const { Post } = require('./Post');

const PROFILE = new Schema({

    Email : {
        type : String,
        required: true,
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
    birthdate : {
        type : String,
        required : true
     },
    country : {
        type : String,
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