const { model, Schema } = require('mongoose');
const { Follow } = require('./Follow');
const { Follower } = require('./Follower');
const { Post } = require('./Post');

const PROFILE = new Schema({

    Email : String,
    user_Name : String,
    name : String,
    lastname : String,
    image_profil : String,
    birthdate : String,
    country : String,
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