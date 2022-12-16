const {Router} = require("express");
const acountCreator =require("../services/stripeAccountsCreator");
// const {Profile} = require("../../mongodb/models/Profile");
// const  mongoose  = require("mongoose");
const { Message_Error_Delete_Categorys } = require('../../Message');
const stripeAccountsConsult = require("../services/stripeAccountsConsult");
const srtipeAccountLink = require("../services/stripeAccountLink");
const stripeConnectedAccounts = require("../services/stripeConnectedAccounts");
const stripeDeleteAccount = require("../services/stripeDeleteAccount");
// const stripeAccountLoginLink = require("../services/stripeAccountLoginLink");

const router= Router()
// Esta ruta crea un nuevo perfil dentro de la cuenta de stripe,
//  y al mismo tiempo linkea el id de esa cuenta con
// un perfil de reply, 
// IMPORTANTE
// esta es una "cuenta basica y aun no tiene datos bancarios.." 
// para ello requerimos conectarla en 
// /stripe/accountLink pues esto va a generar un link para que el usuario
// se registre

// recibe un id del perfil de reply,  datos por body
router.post("/stripe/account/", async (req, res)=>{
    const {id} = req.body;
    if(id){
        try {
            const user = await acountCreator(id);
            res.json({message: "operacion relizada con exito", data:user});
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    } else{
        res.status(400).json(Message_Error_Delete_Categorys)
    }
   
})
// Borra una cuenta de stripe pasandole un id
router.delete("/stripe/account/?" ,async (req, res) =>{
    const {id} = req.query;
    if(id){
        try {
           const deleted = await stripeDeleteAccount(id)
           res.status(200).json({message: "operacion realizada con exito", data: deleted})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }else{
        res.status(400).json(Message_Error_Delete_Categorys)

    }
})
// con esta ruta consultamos los datos de una cuentra en la API de stripe
// Si el usuario ya tiene los pago habilitados, manda un mensaje avisando
// de lo contrario solo manda los datos de la cuenta
router.get("/stripe/account/?", async (req, res)=>{
    const {id} = req.query;
    if(id){
        try {
            const accounInfo = await stripeAccountsConsult(id);
            if(accounInfo.details_submitted && accounInfo.charges_enabled){
                res.status(200).json({message: "el usuario ya entrego los detalles requeridos y tiene su cuenta conectada",
                                    data: accounInfo
                                        })
            } else{
                res.json({message: "operacion relizada con exito" , data:accounInfo})
            }
            
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    } else{
        res.status(400).json(Message_Error_Delete_Categorys)
    }
   
})
//ignorar esto ↓--------------------------------
// Crear un login Link
//
// router.post("/stripe/account/loginLink",async (req, res)=>{
//     const loginLink = await stripeAccountLoginLink("acct_1MFPBwPE5Mfh6NuQ")
//     res.send(loginLink)
// })
// ↑--------------------------------------------


// si el usuario no tiene sus datos bancarios en la cuenta
// utilizamos esto para registrarlo en 
// la base de datos de stripe para que valide los datos, 
// la respuesta manda un link para que el usuario registre
//  sus datos bancarios
// IMPORTANTE el link solo puede ser utilizado una ves pero
// se puede crear las veces que sea necesario
router.post("/stripe/accountLink/?", async (req, res)=>{
    const {id} = req.query;
    if(id){
        try {
            const account = await srtipeAccountLink(id)
            res.send({message:"cuenta conectada con exito", data: account})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    } else{
        res.status(400).json(Message_Error_Delete_Categorys)
    }
   
})
//muestra una lista de todas las cuentas
router.get("/stripe/connectedAccounts/", async (req, res)=>{
    try {
       const accounts = await stripeConnectedAccounts();
     res.send(accounts) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

module.exports= router