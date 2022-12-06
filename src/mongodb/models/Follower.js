const {model, Schema} = require('mongoose')
const { Profile } = require('./Profile')

const FOLLOWER = new Schema({
    isPremium: Boolean,
    profileId: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
})

const Follower = model('Follower', FOLLOWER)
module.exports = {Follower}