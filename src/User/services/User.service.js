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
            const newPerfil = await Profile.aggregate([
                {
                    $match : req.query   // puede buscar por query la refrencia, si no tiene qury llegaran todos los profiles
                },{                       // la ruta es user - no puede tener la ruta sucia si no va a buscar  los profile
                    $lookup : {           // si la ruta llega asi - /user?name='', manda un error ojoooo
                        from : 'posts',
                        let : {image : '$content'},
                        pipeline : [
                                {
                                    $match : {
                                        $expr : {
                                           $in : ['$_id', '$$image'] 
                                        }
                                    }
                                }
                        ],
                        as : 'posts'
                    }
                },{
                    $project : { content : 0}
                }]);
                if(!newPerfil.length) throw Error({message : 'No existe profil con esos parametros'})
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
                 as : 'contents',
             }
         },{
            $project : {content : 0}
         }])
         
         res.status(200).json(newProfile)
       } catch (error) {
        res.status(400).send({message : error.message})
       }
    }
}