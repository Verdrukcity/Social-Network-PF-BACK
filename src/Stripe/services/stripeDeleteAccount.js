const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function deleteaccount (id) {
    try {
        const deleted = await stripe.accounts.del(id);
        return deleted
    } catch (error) {
        throw Error(error.message)
    }
    
}
