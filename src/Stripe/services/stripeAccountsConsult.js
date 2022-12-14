const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function accountConsult (id){
    try {
         const account = await stripe.accounts.retrieve(id);
    return account
    } catch (error) {
        throw Error(error.message)
    }
   
}
