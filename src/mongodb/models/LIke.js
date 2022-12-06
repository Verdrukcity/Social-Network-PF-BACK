const {model, Schema} = require('mongoose');
const { Post } = require('./Post');

const LIKE = new Schema({
    numLikes: Number,
    postId: {
        type: Schema.Types.ObjectId,
        ref: Post
    }
});

const Like = model('Like', LIKE);
module.exports = {Like};