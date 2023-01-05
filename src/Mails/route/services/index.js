const nodemailer = require('nodemailer')

module.exports = {
    sendRegisterMail: async (receiver) => {

        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: 'social.reply.team@gmail.com', 
                pass: 'jmukptcfnxxxbbow', 
                },
            });
            
            await transporter.sendMail({
            from: '"Reply" <social.reply.team@gmail.com>', // sender address
            to: receiver, // list of receivers
            subject: "Bienvenido a Reply!", // Subject line
            text: "Success register confirmation", // plain text body
            html: "<h1>Bienvenido!</h1><br/><h3>Tu cuenta de Reply se ha creado correctamente, ahora puedes iniciar sesión en la sección Login!</h3><br/><br>Equipo de Reply ;)</br>", // html body
            });
        }catch(error){
            throw Error(error.message)
        }
    }
}