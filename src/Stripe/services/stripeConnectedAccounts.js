const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports= async function connectedAccounts(){
    try {
        const accounts = await stripe.accounts.list({
    limit: 100,
  });
    return accounts
    } catch (error) {
        throw Error(error.message)
    }
    
}
