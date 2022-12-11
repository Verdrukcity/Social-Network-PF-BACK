const {model, Schema} = require('mongoose');
const { Comment } = require('./Comment');
const { Profile } = require('./Profile');

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
    category:{
        type : String,
    },
    userId : {
           type : Schema.Types.ObjectId,
           ref : Profile
    },
    commentId: [{
        type: Schema.Types.ObjectId,
        ref: Comment
    }]
});

const Post = model('Post', POST);
module.exports = {Post};