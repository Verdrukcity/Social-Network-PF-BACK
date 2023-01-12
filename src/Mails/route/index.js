const { Router } = require('express');

const router = Router();

const { sendRegisterMail, succesPaymentMail, failedPaymentMail } = require('./services');

router.post('/registermail', (req,res)=>{
    const {receiver} = req.body
    try{
        sendRegisterMail(receiver)
        res.send('Mail sended')
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

router.post('/successpaymentmail', (req, res)=>{
    const {mailReceiver} = req.body
    try{
        succesPaymentMail(mailReceiver)
        res.send('Mail sended')
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

router.post('/failedpaymentmail', (req, res) => {
    const {mailReceiver} = req.body
    try{
        failedPaymentMail(mailReceiver)
        res.send('Mail sended')
    }
    catch(error){
        res.status(400).send(err.message)
    }
})

module.exports = router