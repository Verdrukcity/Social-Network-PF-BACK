const {Router} = require("express");
const acountCreator =require("../services/stripeAccountsCreator");
const {Profile} = require("../../mongodb/models/Profile");
const  mongoose  = require("mongoose");
const { Message_Delete_Category } = require('../../Message');
const stripeAccountsConsult = require("../services/stripeAccountsConsult");

const router= Router()
// Esta ruta crea un nuevo perfil dentro de la cuenta de stripe, y al mismo tiempo linkea el id de esa cuenta con
// un perfil de reply
// recibe datos por body
router.post("/stripe/createAccount/", async (req, res)=>{
    const {id} = req.body;
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
// con esta ruta consultamos los datos de una cuentra en la API de stripe
router.get("/stripe/getAccount/", async (req, res)=>{
    const {id} = req.body;
    if(id){
        try {
            const accounInfo = await stripeAccountsConsult(id);
            res.json(accounInfo)
        } catch (error) {
            res.status(400).json(error.message);
        }
    } else{
        res.status(400).json(Message_Delete_Category)
    }
   
})

module.exports= router