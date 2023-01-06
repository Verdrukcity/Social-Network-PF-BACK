const { Profile } = require('../../mongodb/models/Profile.js');
const { Post } = require('../../mongodb/models/Post.js');

module.exports = {
    upUser : async (req, res) =>{
        try {
            const userProfile = await Profile.findById(req.body.id);
            
                userProfile.status ? 
                  await Profile.findByIdAndUpdate(userProfile._id,{
                      status : false
                    }) :
                   await Profile.findByIdAndUpdate(userProfile._id,{
                        status : true
                      }); 
                      const upUser = await Profile.findById(userProfile._id);
            res.status(200).json(upUser)
            
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    postUp : async (req, res) =>{
        try {
            const newPost = await Post.findById(req.body.id);
            
                newPost.status ? 
                  await Post.findByIdAndUpdate(newPost._id,{
                      status : false
                    }) :
                   await Post.findByIdAndUpdate(newPost._id,{
                        status : true
                      }); 
                      const newPostUp = await Post.findById(newPost._id);
            res.status(200).json(newPostUp)
            
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
};