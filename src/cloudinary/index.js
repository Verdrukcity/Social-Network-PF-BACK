const cloudinary = require('cloudinary').v2 //instancio cloudinary
require('dotenv').config()

const {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET} = process.env

//configuro la cuenta de cloudinary
cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_SECRET,
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