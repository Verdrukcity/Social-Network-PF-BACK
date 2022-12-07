const {model, Schema} = require('mongoose');
const { Comment } = require('./Comment');

const POST = new Schema({
    text: {
        type : String,

    },
    multimedia:{ 
       type : String,
       
    },
    multimedia_id :{
        type : String,
        
    },
    type:{
        type : String,
    },
    commentId: [{
        type: Schema.Types.ObjectId,
        ref: Comment
    }]
});

const Post = model('Post', POST);
module.exports = {Post};