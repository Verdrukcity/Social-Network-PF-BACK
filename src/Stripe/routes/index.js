const {Router} = require("express");
const router = Router();
const Account = require("./Account");
const Price = require("./Price");
const Chekout = require("./Chekout")

router.use("/", Account );
router.use("/", Price);
router.use("/", Chekout);


module.exports= router