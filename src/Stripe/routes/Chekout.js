const {Router} = require("express");
const stripeChekout = require("../services/stripeChekout");
const router = Router()
// esta ruta crea un link provisional con duracion de un dia para mandar el pago a la persona
// que nosotros establescamos en el id
// el idprice tambien es requerido, de lo contrario no va a funcionar
// hay que hacer pruebas pero las transferencias entre paises aun no estan del todo ok
router.post("/stripe/chekout/",async (req, res)=>{
    const {id, price} = req.query;
    try {
        if(id && price){
        const chekout = await stripeChekout(price, id);
        res.json(chekout);
     } else{
        res.status(400).json({error: "no se suminstraron los datos id o price"})
     }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
    
})

module.exports = router