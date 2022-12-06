const express = require('express')
const router = express.Router()
const {Profile } = require('../../mongodb/models/Profile')
//aqui manejo las rutas del create

/**
 * trae todos los generos 
 * tipo : post
 * ruta : /create
 * no requiere de parametro alguno 
 */

// con esta ruta traigo todo los datos de Profile
router.get('/', (req,res)=>{

    Profile.find()
           .then(data => res.status(200).json(data))
           .catch(error => res.status(400).json({ message : error.message}))
})

// creo los profile
router.post('/',async (req, res)=>{
    
try {
    const newProfile = await Profile.create(req.body)
        res.status(200).json(newProfile);
    
} catch (error) {
    res.status(400).send(error.message)
}

})



module.exports = router



