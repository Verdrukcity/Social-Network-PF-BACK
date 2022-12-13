const {Schema, model } = require('mongoose');

const MAPA = new Schema({
    name : String,
    image : String
});

const Mapa = model('Mapa', MAPA);

module.exports = { Mapa };
