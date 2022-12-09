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
router.post("/" ,async(req, res)=>{
    try {
       await makeCategoryes(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
});
router.delete("/", async (req, res)=>{
    try {
        await deleteCategory(req, res)
    } catch (error) {
        res.status(400).json(error.message)
    }
});
router.put("/", async (req, res) =>{
    try {
        await updateCategory(req, res);
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router