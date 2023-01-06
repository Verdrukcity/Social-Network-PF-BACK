const express = require('express')
const router = express.Router()
const { createUser, users } = require('../services/User.service')

//aqui manejo las rutas del user

/**
 * trae todos los profile o los seleccionados
 * tipo : get
 * ruta : /user
 * no requiere de parametro alguno pero puede ocupar Query
 */

//  Esta desactivada par que no cualquiera pueda tener los usuarios              Search all || search by text || search by type
/*router.get("/", async (req, res) => {
    try {
         users(req, res)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})*/
/**
 * Genera un nuevo profile
 * tipo : profile
 * ruta : /user
 * no requiere de parametro alguno 
 */

router.post('/', async (req, res) => {
    try {
        createUser(req, res)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})


module.exports = router