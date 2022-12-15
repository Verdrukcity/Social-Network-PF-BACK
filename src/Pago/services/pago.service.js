
const Stripe = require('stripe')
const stripe= new Stripe("sk_test_51MEyrGDmJ76nV301pUGNCGjJEgoiyVA3hP3TORnqWLm9qCYzRZh9DtRyGeayF2albXGtTKjQI18jDIzht5t7Yy4q00hc6AcVCN")
module.exports={

    Pago:async(req,res)=>{
    
        try { 
            
            const {id,amount }=req.body
            console.log(id + "  " + amount)
            const payment=await stripe.paymentIntents.create({

                    amount:amount,
                    currency:"USD",
                    description:"Pago Premium",
                    payment_method:id,
                    confirm:true

            })
            res.send(payment.status)
            
        } catch (error) {
            console.log(error.message)
            res.error(error.message)
        }

    }


}