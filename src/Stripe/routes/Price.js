const {Router} = require("express");
const {onePrice, manyprices,} = require("../services/stripePrices");
const router = Router()

router.get("/stripe/price/", async (req, res)=>{
    const{id} = req.query;
    if(id){
        try {
            const prices = await onePrice("price_1MFR4BAFCTt3dg6N5rtauWLe");
            res.status(200).json({message: "operacion realizada con exito", data:prices}) 
        } catch (error) {
            res.status(400).json({error: error.message})
        }
       
    } else{
        res.status(400).json({error: "no se suminstro el id"});
    }
    
});
router.get("/stripe/prices/", async (req, res)=>{
    const prices = await manyprices()
    res.send(prices)
})

module.exports= router