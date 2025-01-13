const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({ 
  
   
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
        // unique: true,
      },
      password: {
        type: String,
        required: true,
      },
     isVerified:{
        type:Boolean,
        default:false,
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
    userAccount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
