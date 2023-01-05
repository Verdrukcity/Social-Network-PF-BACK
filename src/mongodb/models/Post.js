const {model, Schema} = require('mongoose');
const { Comment } = require('./Comment');
const { Profile } = require('./Profile');
const { Like } = require('./Like')

const POST = new Schema({
    title : {
        type : String,
    },
    text: {
        type : String,

    },
    multimedia:{ 
       type : String,
       
    },
    multimedia_id :{
        type : String,
        
    },
    status : {
        type : Boolean,
    },
    category:{
        type : Array,
    },
    userId : {
           type : Schema.Types.ObjectId,
           ref : Profile
    },
    commentId: [{
        type: Schema.Types.ObjectId,
        ref: Comment
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: Like
    }]
});

const Post = model('Post', POST);
module.exports = {Post};