const { Profile } = require('../../mongodb/models/Profile.js');
const { Post } = require('../../mongodb/models/Post.js');

const {Message_Admin_Activo, 
        Message_Admin_Inactivo,
            Message_Error_Admin} = require('../../Message/index.js');

module.exports = {
    upUser : async (req, res) =>{
        try {
            const {id} = req.body;
            const userProfile = await Profile.findById(id);
            if(userProfile) throw Error({Message : Message_Error_Admin})
            
                if(userProfile.status){
                  await Profile.findByIdAndUpdate(id,{
                      status : false
                    }) 
                    return res.status(200).json({Message : Message_Admin_Inactivo});
                }else{
                    await Profile.findByIdAndUpdate(id,{
                        status : true
                    });
                    return res.status(200).json({Message : Message_Admin_Activo});
                    } 
            
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    postUp : async (req, res) =>{
        try {
            const {id} = req.body;
            const newPost = await Post.findById(id);
            if(newPost) throw Error({Message : Message_Error_Admin})

               if(newPost.status){
                  await Post.findByIdAndUpdate(id,{
                      status : false
                    }) 
                    return res.status(200).json({Message : Message_Admin_Inactivo});
                }else{
                   await Post.findByIdAndUpdate(id,{
                        status : true
                      })
                      return res.status(200).json({Message : Message_Admin_Activo});
                    } 
            
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
};