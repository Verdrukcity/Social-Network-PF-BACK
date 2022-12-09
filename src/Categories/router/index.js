const { Router } = require('express');
const router = Router();
const categoryCreate = require("./category.create")

router.use('/category', categoryCreate )



module.exports = router