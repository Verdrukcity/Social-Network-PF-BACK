const { model, Schema } = require("mongoose");
const { Post } = require("./Post");
const { Profile } = require("./Profile");

const LIKE = new Schema({
    usersLiked: {
        type: Schema.Types.ObjectId,
        ref: Profile,
    },
});

const Like = model("Like", LIKE);
module.exports = { Like };
