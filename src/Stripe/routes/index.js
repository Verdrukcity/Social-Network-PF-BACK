const {Router} = require("express");
const acountCreator =require("../services/stripeAccountsCreator");
const {Profile} = require("../../mongodb/models/Profile");
const  mongoose  = require("mongoose");
const { Message_Delete_Category } = require('../../Message');
const stripeAccountsConsult = require("../services/stripeAccountsConsult");

const router= Router()

router.post("/stripe/createAccount/:id", async (req, res)=>{
    const {id} = req.params
    if(id){
        try {
            const user = await acountCreator(id);
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else{
        res.status(400).json(Message_Delete_Category)
    }
   
})
router.get("/stripe/getAccount/:id", async (req, res)=>{
    const {id} = req.params;
    if(id){
        try {
            const accounInfo = await stripeAccountsConsult("acct_1MF3CePKn1BMwBP4");
            res.json(accounInfo)
        } catch (error) {
            res.status(400).json(error.message);
        }
    } else{
        res.status(400).json(Message_Delete_Category)
    }
   
})

module.exports= router