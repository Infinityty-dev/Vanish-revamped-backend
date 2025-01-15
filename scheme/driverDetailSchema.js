const mongoose = require('mongoose');

const driverDetailSchema = new mongoose.Schema({

    Id :{
       type:String,
       required:true,
    },
    
    Name :{
        type:String,
        required:true,
    },

    EmailorPhone :{
         type:String,
         required:true,
    },

    Password :{
        type:String,
        required: true,
        unique: true,
    },

    TandC :{
        type:boolean,
        default: false,
        required: true,

    },

    Address :{
        type: String,
        required: true,

    },

    CarType :{
        type: String,
        required: true,

    },

    CarImage :{
        type: String,
        required :true,
    },

    CarHaulageDimenson :{
        type: String,
        required :true,
    },  

    DriverLicenseNumber :{
        type: String,
        required :true,
    },

    LicenseType :{
        type: String,
        required: true,
    },

    
})

const Driver= mongoose.model("drivers", driverDetailSchema);
module.exports = Driver;