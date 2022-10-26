const mongoose = require('mongoose');

var Data = mongoose.model('Data',{
    fullname: { type: String},
    name: { type: String},
    price: { type: Number},
    quantity: {type: Number},
    address: {type: String},
    number: {type: Number}
});

module.exports = {Data};