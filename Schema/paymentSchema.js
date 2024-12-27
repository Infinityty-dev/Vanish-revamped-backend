const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    id: {
        type: String,
        required : true,
    
    },
    paymentType: {
        paymentType: Transfer,Cash,
    },
    
    Amount : {
        type: Number,
    }

})

const Payment = mongoose.model('payments',paymentSchema);

module.exports = Payment