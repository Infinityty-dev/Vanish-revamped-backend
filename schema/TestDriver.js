const mongoose = require("mongoose");//import mongoose
const driverSchema = new mongoose.Schema({ //create an instance of mongoose schema
  
   
    fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      TandC:{
        type: Boolean,
        required: true,
        default: false,
      },
      address:{
        type: String,
        // required: true,
      },
      carType:{
        type: String,
        // required: true,
      },
      carImage:{
        type: String,
        // required: true,
      },
      driverLicenceNumber:{
        type: String,
        // required: true,
      },
      licenceType:{
        type: String,
        // required: true,
      },
      pick_up_location:{
        type: String,
        // required: true,
      },
      drop_off_location:{
        type: String,
        // required: true,
      },
      userComplaint:{
        type:Number
      },
      completedDelivery:{
        type:Number
      },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    // store: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "stores",
    //   },
    // ],
  },
  { timestamps: true }
);

const driverModel = mongoose.model("driver", driverSchema);
module.exports = driverModel;
