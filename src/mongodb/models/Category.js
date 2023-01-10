const {model, Schema} = require('mongoose')
const { Post } = require('./Post')

const CATEGORY = new Schema({
    category: String,
})

const Category = model('Category', CATEGORY)
module.exports = {Category}