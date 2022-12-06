const {model, Schema} = require('mongoose');
const { Comment } = require('./Comment');

const POST = new Schema({
    text: {
        type : String,
        required : true
    },
    multimedia:{ 
       type : String,
       required : true
    },
    multimedia_id :{
        type : String,
        required : true
    },
    commentId: [{
        type: Schema.Types.ObjectId,
        ref: Comment
    }]
});

const Post = model('Post', POST);
module.exports = {Post};