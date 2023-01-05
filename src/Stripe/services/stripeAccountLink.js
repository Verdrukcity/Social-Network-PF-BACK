const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports= async function accountLink (account){
  try {
    const accountLink = await stripe.accountLinks.create({
        account: account,
        refresh_url: process.env.REDIRECTION_STRIPE_ACCOUNTLINK,
        return_url: process.env.RETURN_STRIPE_ACCOUNTLINK,
        type: 'account_onboarding',
      });
      return accountLink
  } catch (error) {
    throw Error(error.message)
  }
    
}