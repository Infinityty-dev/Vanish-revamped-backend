const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

runningService:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
},  

serviceType:{
    type : String,
    required:true,
    trim: true
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
}, { timestamps: true }

)

const Service = mongoose.model('Services',serviceSchema);

module.exports = Service

