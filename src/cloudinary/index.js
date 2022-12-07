const cloudinary = require('cloudinary').v2 //instancio cloudinary
require('dotenv').config()

const {cloudinary_Name, cloudinary_Apikey, cloudinary_secret} = process.env

//configuro la cuenta de cloudinary
cloudinary.config({ 
    cloud_name: cloudinary_Name, 
    api_key: cloudinary_Apikey, 
    api_secret: cloudinary_secret,
    secure: true
  })


let createImg = async (file)=>{
    //recibe como argumento el archivo de la imagen
    //subo la imagen a cloud
    const imgFile =  await cloudinary.uploader.upload(file)

    //devuelve el archivo de la imagen creada en cloud (objeto con datos)
    return imgFile
}

let delImg = async (fileId)=>{
    //recibe como argumento el id de la imagen en cloudinary
    //borra la imagen de cloud
    let deletedStatus = await cloudinary.uploader.destroy(fileId)

    //devuelve el mensaje obtenido
    return deletedStatus
}

module.exports = {createImg, delImg}