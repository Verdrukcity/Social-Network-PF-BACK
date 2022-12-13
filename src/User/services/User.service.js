const { Profile } = require("../../mongodb/models/Profile");
const mongoose = require('mongoose')
const {
    Message_Error_Create_User,
    Message_Error_Find_User

} = require( "../../Message")

module.exports = {
    createUser : async (req, res)=>{
        try {
            const { email, user_Name , name, lastname,
                      birthdate, country
                  } = req.body;

                if(
                    !email || !user_Name  || !name || !lastname ||
                      !birthdate || !country
                  ) throw Error(Message_Error_Create_User)
                  
              const newProfil = await Profile.create(req.body)
              res.status(200).json(newProfil)
        } catch (error) {
            res.status(400).send( error.message)
        }
    },

    users :async (req, res)=>{
       try {
            const newPerfil = await Profile.aggregate([
                {
                    $match : req.query   // puede buscar por query la refrencia, si no tiene qury llegaran todos los profiles
                },                       // la ruta es user - no puede tener la ruta sucia si no va a buscar  los profile
                {                        // si la ruta llega asi - /user?name='', manda un error ojoooo
                    $lookup :{
                        from : 'mapas',
                        localField : 'country',
                        foreignField : '_id',
                        as : 'country',
                    }
                },
                {
                    $unwind : '$country'
                },       
                {                       
                    $lookup : {          
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
                if(!newPerfil.length) throw Error(Message_Error_Find_User)
            res.status(200).json(newPerfil)
       } catch (error) {
        throw Error(error.message)
       }
    },
    userId : async (req, res) =>{
       try {
          const { id } = req.params;
        let id1 = mongoose.Types.ObjectId(id)
        
        var newProfile = await Profile.findById(id).select(['user_Name', '_id', 'image_profil', 'country', 'content', 'followers', 'follow'])

        newProfile = await Profile.aggregate([
          {
              $match : { "_id" : id1}
          },
          {
             $lookup :{
                 from : 'mapas',
                 localField : 'country',
                 foreignField : '_id',
                 as : 'country',
             }
         },
         {
             $unwind : '$country'
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
         
         res.status(200).send(newProfile[0])
       } catch (error) {
        throw Error( error.message)
       }
    }
}