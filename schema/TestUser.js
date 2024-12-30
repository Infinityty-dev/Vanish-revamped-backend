const mongoose = require("mongoose");//import mongoose
const userSchema = new mongoose.Schema({ //create an instance of mongoose schema
  
   
    name: {
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
      pick_up_location:{
        type: String,
        
      },
      drop_off_location:{
        type: String,
        
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

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
