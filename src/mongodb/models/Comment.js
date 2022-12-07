const {model, Schema} = require('mongoose');
const { Post } = require('./Post');
const { Profile } = require('./Profile');

const COMMENT = new Schema({
    text: {
        type: String,
        required: true
    },
    profileId: [{
        type: Schema.Types.ObjectId,
        ref: Profile 
    }],
    postId:[{
        type: Schema.Types.ObjectId,
        ref: Post
    }]
});

const Comment = model('Comment', COMMENT);
module.exports = {Comment};