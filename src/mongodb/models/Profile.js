const { model, Schema } = require('mongoose');

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
        type : Array
    },
    followers : [{
        type : Schema.Types.ObjectId,
        ref : follower
    }]
});

const Profile = model('Profile', PROFILE);
module.exports= {Profile};