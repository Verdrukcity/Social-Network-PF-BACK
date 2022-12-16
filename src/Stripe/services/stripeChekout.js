const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function chekout(PRICE_ID, CONNECTED_ACCOUNT_ID){
    const session = await stripe.checkout.sessions.create({
        line_items: [{
          price: PRICE_ID,
          quantity: 1,
        }],
        mode: 'payment',
        success_url: process.env.REDIRECTION_STRIPE_SUCCES,
        cancel_url: process.env.REDIRECTION_STRIPE_FAIL,
        payment_intent_data: {
          transfer_data: {
            destination: CONNECTED_ACCOUNT_ID,
          },
        },
      });
      return session
}