const express = require('express')
const router = express.Router()

//aqui manejo las rutas del create

/**
 * trae todos los generos 
 * tipo : post
 * ruta : /create
 * no requiere de parametro alguno 
 */


router.get('/',async (req,res)=>{

    try {
        
        
        res.status(200).json({
            message:'Llegue!.',
           
        })

    } catch (error) {
        res.status(400).json({message:error.message})
    }
   
})




module.exports = router



