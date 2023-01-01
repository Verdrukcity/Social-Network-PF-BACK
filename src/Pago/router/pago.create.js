const express = require("express");
const {Pago} = require("../services/pago.service.js")
const router = express.Router();

router.post("/" ,async(req, res)=>{
    try {
       await Pago(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
});

module.exports=router