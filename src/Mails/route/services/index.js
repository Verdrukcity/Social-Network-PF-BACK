const nodemailer = require('nodemailer')
require('dotenv').config()
const {REPLYGMAIL, REPLYGMAILPASS} = process.env

module.exports = {
    sendRegisterMail: async (receiver) => {

        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: REPLYGMAIL, 
                pass: REPLYGMAILPASS, 
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
    },
    succesPaymentMail: async (mailReceiver) => {
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                user: REPLYGMAIL, 
                pass: REPLYGMAILPASS, 
                },
            });
            
            await transporter.sendMail({
            from: '"Reply" <social.reply.team@gmail.com>', 
            to: mailReceiver, 
            subject: "Pago efectuado con éxito!", 
            text: "Success payment confirmation", 
            html: `<h1>Gracias por colaborar con la comunidad!</h1><br/><h3>Tu donación se ha realizado correctamente!</h3><br/><br>Equipo de Reply ;)</br>`,
            });
        }catch(error){
            throw Error(error.message)
        }
    },
    failedPaymentMail: async (mailReceiver) => {
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                user: REPLYGMAIL, 
                pass: REPLYGMAILPASS, 
                },
            });
            
            await transporter.sendMail({
            from: '"Reply" <social.reply.team@gmail.com>', 
            to: mailReceiver, 
            subject: "Pago defectuoso.", 
            text: "Failed payment notification", 
            html: `<h1>Algo ha salido mal.</h1><br/><h3>Lo sentimos, pero tu donación no se ha podido realizar correctamente.</h3><br/><br>Equipo de Reply ;)</br>`,
            });
        }catch(error){
            throw Error(error.message)
        }
    }
}