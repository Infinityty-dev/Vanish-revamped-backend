
const TestUser = require("../schema/TestUser.js");
const serviceModel = require('../schema/ServiceOptionAndMovementDetailsSchema.js');
const mongoose = require('mongoose');


exports.userMovementPlan = async (req,res)=>{

    try{
        const {serviceType,pickUpDate,pickUpLocation,pickUpZone,dropOffLocation,dropOffZone} = req.body

        const userId = req.params.id;
        const getUserId = await TestUser.findById(userId);
        
        if (!getUserId) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

          //validating inputs
        if(!serviceType || !pickUpDate || !pickUpLocation || !pickUpZone || !dropOffLocation || !dropOffZone){
        return res.status(400).json({
            message: "all the inputs are required",
            error: true,
            success: false
        })
    }

        const getUserMovement = new serviceModel({
            serviceType,
            pickUpDate,
            pickUpLocation,
            pickUpZone,
            dropOffLocation,
            dropOffZone,
            runningService: getUserId._id
        });
          

        //   getUserMovement.runningService = getUserId;
          await getUserMovement.save();
          
        
        if (!getUserId.userAccount) getUserId.userAccount = []; // Ensure userAccount exists
        getUserId.userAccount.push(new mongoose.Types.ObjectId(getUserMovement._id));

        await getUserId.save(); 

            res.status(201).json({
            message: "movement detail Created Sucessfully",
            data: getUserMovement,
            });

    }catch(error){

        console.error(error);
        return res.status(500).json({
            message: `this user does not exist`,
            error:true,
            success:false
        })

    }
}

// module.exports = {userMovementPlan}