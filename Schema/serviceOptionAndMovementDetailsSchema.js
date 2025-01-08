const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

runningService:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
},  

serviceType:{
    type : String,
    required:true
},

pickUpDate: {
    type : Date,
    required:true
},

pickUpLocation: {
    type: String,
    required:true
},
pickUpZone: {
    type: String,
    required:true
},
dropOffLocation: {
    type: String,
    required:true
},
dropOffZone: {
    type: String,
    required:true
},


})

const Service = mongoose.model('services',serviceSchema);

module.exports = Service

