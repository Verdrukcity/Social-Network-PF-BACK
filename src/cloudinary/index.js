const fs = require('fs-extra');
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
    if(file.mimetype.split('/')[0] === 'image'){
        const imgFile =  await cloudinary.uploader.upload(file.tempFilePath,{
            folder : 'red social_image'
        })

       await fs.unlink(file.tempFilePath) // es para borrar la imagen que se suve a la carpeta /tpm/ luego que se monte 
        //devuelve el archivo de la imagen creada en cloud (objeto con datos)
        return imgFile
    };
    if(file.mimetype.split('/')[0] === 'video'){
        console.log(file);
        const videFile =  await cloudinary.uploader.upload_large(file.tempFilePath,{
            resource_type : "video" , 
            chunk_size : 6000000,
            folder : 'red social_videos',  

        })
       await fs.unlink(file) // es para borrar la imagen que se suve a la carpeta /tpm/ luego que se monte 
        //devuelve el archivo de la imagen creada en cloud (objeto con datos)
        return videFile
    };

}

let delImg = async (fileId)=>{
    //recibe como argumento el id de la imagen en cloudinary
    //borra la imagen de cloud
    let deletedStatus = await cloudinary.uploader.destroy(fileId)

    //devuelve el mensaje obtenido
    return deletedStatus
}

module.exports = {createImg, delImg}