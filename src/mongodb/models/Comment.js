const {model, Schema} = require('mongoose');
const { Profile } = require('./Profile');

const COMMENT = new Schema({
    text: {
        type: String,
        required: true
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: Profile 
    }
});

const Comment = model('Comment', COMMENT);
module.exports = {Comment};