const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

id:{
    type: String,
    required: true,
},  

office:{
    type : Boolean,
},

home: {
    type : Boolean,
},

packingAndLoading: {
    type: Boolean,
},

})

const Service = mongoose.model('services',serviceSchema);

module.exports = Service

