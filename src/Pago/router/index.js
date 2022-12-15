const { Router } = require('express');
const router = Router();
const pagoStripe=require("./pago.create")

router.use('/pago', pagoStripe )



module.exports = router