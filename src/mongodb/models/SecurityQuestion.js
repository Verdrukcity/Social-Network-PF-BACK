const {model, Schema} = require('mongoose')
const { Profile } = require('./Profile')

const SECURITYQUESTION = new Schema({
    question: String,
    answer: String,
    profileId: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
})

const SecurityQuestion = model('SecurityQuestion', SECURITYQUESTION)
module.exports = {Category}