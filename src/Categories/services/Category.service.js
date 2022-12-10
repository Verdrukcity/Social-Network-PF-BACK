const {Category} = require("../../mongodb/models/Category.js")

module.exports = {
    findCategoryes : async(req, res)=>{
        try {
            const CATEGORYS = await Category.find({});
            res.status(200).json({message: "todo salio ok", data: CATEGORYS})
        } catch (error) {
            throw new Error (error.message)
        }
    },
     makeCategoryes : async (req, res) =>{
        const {text} = req.body
        try {
            if(text){
                const CATEGORY = await Category.create({
                category : text,
            })
                res.json({message: "Categoria creada correctamente", data: CATEGORY})
            }else{
                throw new Error ("No se suminstraron los datos requeridos")
            }
            
        } catch (error) {
            throw new Error(error.message)
        }
     },
     deleteCategory: async (req, res) =>{
        try {
            const {id, deleteMany, category} = req.body;
            if(id && !deleteMany){
               const deleted = await Category.deleteOne({_id: id});
              return res.status(200).json({
                message: "Categoria eliminada correctamente",
                data: deleted
               })
            }
             if(id && deleteMany) {
                const deleted = await Category.deleteMany({category: category});
              return  res.status(200).json({
                 message: "Categorias eliminadas correctamente",
                 data: deleted
                })
            } else{
                throw new Error("no se suministro el id")
            }
            
        } catch (error) {
            throw new Error(error.message)
        }
     },
     updateCategory: async (req, res) =>{
        try {
            const {id, text} = req.body;
            if(id && text) {
                const UPDATE = await Category.updateOne({_id:id}, {category: text})
                const newCategory = await Category.findById(id)
                res.status(200).json({
                    message: "category updated",
                    data: UPDATE,
                    newCategory: newCategory
                })
            } else{
                throw new Error("faltan los datos id o text")
            }
        } catch (error) {
            throw new Error(error.message)
        }
     }
}