const { model, Schema } = require('mongoose');
const { Profile } = require('./Profile');

const FOLLOW = new Schema({
    profileId: [{
        type: Schema.Types.ObjectId,
        ref: Profile
    }]
})

const Follow = model('Follow', FOLLOW)
module.exports = {Follow}