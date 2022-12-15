const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {Profile} = require("../../mongodb/models/Profile");
const mongoose = require("mongoose");

module.exports = async function acountCreator (id){
    try {
        const idProfile = mongoose.Types.ObjectId(id);
    const userProfile = await Profile.findById(idProfile);
    const account = await stripe.accounts.create({
        type: 'express',
        email: userProfile.email,
        country: "US",
        capabilities: {
            card_payments: {requested: true},
            transfers: {requested: true},
          },
    });
    userProfile.userStripe = account.id;
    userProfile.save()
        return account
    } catch (error) {
        throw Error(error.message)
    }
    
    
}