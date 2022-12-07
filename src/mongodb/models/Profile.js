const { model, Schema } = require('mongoose');
const { Follow } = require('./Follow');
const { Follower } = require('./Follower');
const { Post } = require('./Post');

const PROFILE = new Schema({

    Email : {
        type : String,
        required: function validateEmail(){
            //chequea email valido
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.Email)){
                return (this.Email)
            }
            else throw new Error('Must enter a valid email')
        }
        ,
        unique: true
    },
    user_Name :{
       type : String,
       required : true
    },
    name : {
        type : String,
        required : true
     },
    lastname : {
        type : String,
        required : true
     },
    image_profil : {
        type : String,
        required : true
     },
    birthdate : {
        type : String,
        required : function(){
            //split al string que llega
            var date = this.birthdate.split('')
            
            //slice para tener solo el año
            date = date.slice(11,15).join('')
            
            //paso a integer
            date = parseInt(date)
            
            //fecha actual
            let actualDate = new Date().getFullYear()
            
            //si da menor a 18 es porque es menor de edad
            if (actualDate - date < 18){
                throw new Error('Debe ser mayor de edad')
            }
            return this.birthdate
        }
     },
    country : {
        type : String,
        required : true
     },
    content : [{
        type : Schema.Types.ObjectId,
        ref : Post
    }],
    follow :{
        type : Array,
        ref: Follow
    },
    followers : [{
        type : Schema.Types.ObjectId,
        ref : Follower
    }]
});

const Profile = model('Profile', PROFILE);
module.exports= {Profile};