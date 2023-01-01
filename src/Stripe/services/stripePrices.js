const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



module.exports={
  onePrice: async function(id) {
  const price = await stripe.prices.retrieve(id);
  return price
},
  manyprices: async function() {
    const prices = await stripe.prices.list({
      limit: 5,
    });
  return prices
}
} 
