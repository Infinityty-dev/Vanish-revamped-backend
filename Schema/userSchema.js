const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    Id :{
        type:String,
        required:true,
     },

    emailorphone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
   
    Name :{
        type:String,
        required:true,
    },

    TandC :{
        type:boolean,
        default: false,
        required: true,

    },

    ServiceOption: {
        required: true,
    },

    VehicleChoice: {
        required: true,
    },

    PickUpLocation: {
        type: String,
        required: true,
    },

    DropOffLocation: {
        type: String,
        required: true,
    },

    UserComlaint:{
        type: Number,

    },

    CompletedDelivery:{
        type: Number,
    }
})

const User = mongoose.model('users',userSchema);

module.exports = User