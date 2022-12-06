const {model, Schema} = require('mongoose')
const { Post } = require('./Post')

const CATEGORY = new Schema({
    category: String,
    postId: [{
        type: Schema.Types.ObjectId,
        ref: Post
    }]
})

const Category = model('Category', CATEGORY)
module.exports = {Category}