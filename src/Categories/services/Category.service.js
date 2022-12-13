const {Category} = require("../../mongodb/models/Category.js")
const{
Message_Create_Category ,
Message_Find_Category,
Message_Error_Create_Category,
Message_Find_Categorys ,
Message_Delete_Category ,
Message_Delete_Categorys ,
Message_Error_Delete_Categorys ,
Message_Update_Categorys,
Message_Error_Update_Categorys,
Message_Error_Incomplete,
} = require( "../../Message")

module.exports = {
    findCategoryes : async(req, res)=>{
        try {
            const CATEGORYS = await Category.find({});
            res.status(200).json({message: Message_Find_Categorys, data: CATEGORYS})
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
                res.json({message: Message_Create_Category, data: CATEGORY})
            }else{
                throw new Error (Message_Error_Create_Category)
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
                message: Message_Delete_Category,
                data: deleted
               })
            }
             if(id && deleteMany) {
                const deleted = await Category.deleteMany({category: category});
              return  res.status(200).json({
                 message: Message_Delete_Categorys ,
                 data: deleted
                })
            } else{
                throw new Error(Message_Error_Delete_Categorys)
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
                    message: Message_Update_Categorys,
                    data: UPDATE,
                    newCategory: newCategory
                })
            } else{
                throw new Error(Message_Error_Update_Categorys)
            }
        } catch (error) {
            throw new Error(error.message)
        }
     }
}