const express = require("express");
const { findCategoryes, makeCategoryes, deleteCategory, updateCategory } = require("../services/Category.service");
const router = express.Router();


// route == /category
//type: GET
//funtion : return all categoryes

router.get("/", async (req, res)=>{
   try {
       await findCategoryes(req, res)
   } catch (error) {
        res.status(400).json(error.message)
   }
   
});
/**
 * crea una categoria
 * tipo : post
 * ruta : /category
 * requiere {text} por body
 */
router.post("/" ,async(req, res)=>{
    try {
       await makeCategoryes(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
});
/**
 * borra uno, varios o todos los post
 * tipo : delete
 * ruta : /category
 * requiere de {id} o de manera opcional { deleteMany, category}
 */
router.delete("/", async (req, res)=>{
    try {
        await deleteCategory(req, res)
    } catch (error) {
        res.status(400).json(error.message)
    }
});
/**
 * actualiza una categoria
 * tipo : put
 * ruta : /category
 * requiere de {id, text}
 */
router.put("/", async (req, res) =>{
    try {
        await updateCategory(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router