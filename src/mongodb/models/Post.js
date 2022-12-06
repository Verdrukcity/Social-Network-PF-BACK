const {model, Schema} = require('mongoose');
const { Profile } = require('./Profile');

const POST = new Schema({
    text: String,
    multimedia: String,
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
});

const Post = model('Post', POST);
module.exports = {Post};