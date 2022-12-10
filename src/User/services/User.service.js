const { Profile } = require("../../mongodb/models/Profile");
const mongoose = require('mongoose')
module.exports = {
    createUser : async (req, res)=>{
        try {
            const { email, user_Name , name, lastname,
                      birthdate, country
                  } = req.body;

                if(
                    !email || !user_Name  || !name || !lastname ||
                      !birthdate || !country
                  ) throw Error({message : 'Faltan parametros'})
                  
              const newProfil = await Profile.create(req.body)
              res.status(200).json(newProfil)
        } catch (error) {
            res.status(400).send({message : error.message})
        }
    },

    users :async (req, res)=>{
       try {
        const newPerfil = await Profile.find()
        res.status(200).json(newPerfil)
       } catch (error) {
        res.status(400).send({message : error.message})
       }
    },
    userId : async (req, res) =>{
       try {
          const { id } = req.params;
        let id1 = mongoose.Types.ObjectId(id)
     
        const newProfile = await Profile.aggregate([
         {
             $match : { "_id" : id1}
         },
         {
             $lookup :{
                 from : 'posts',
                 localField : 'content',
                 foreignField : '_id',
                 as : 'post',
             }
         }])
         
         res.status(200).json(newProfile)
       } catch (error) {
        res.status(400).send({message : error.message})
       }
    }
}