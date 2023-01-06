const { Router } = require('express');

const router = Router();

const { sendRegisterMail } = require('./services');

router.post('/mail', (req,res)=>{
    const {receiver} = req.body
    try{
        sendRegisterMail(receiver)
        res.send('Mail sended')
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router