const mongoose = require('mongoose');

const driverDashboardSchema = new mongoose.Schema({

    id :{
         type : String,
         required: true,
    },

    Name: {
        type: Strng,
        required: true,

    },

    Deliveries : {
        type: Number,

    },

    CompletedDeliveries : {
        type: Number,
    },

    Complaints : {
        type: Number,
    },

    AmountEarned : {
        type: Number
    },

    Location: {
        type: String,
        required: true,
    },




})

const driver = mongoose.model('driver',driverDashboardSchema);

module.exports = driver