const {Router} = require("express");
const router = Router();
const CommentCreate = require("./Comment.create")

router.use("/comment",  CommentCreate)

module.exports = router