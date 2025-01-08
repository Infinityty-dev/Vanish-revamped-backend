const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const userModel = require('../Schema/TestUser.js')
const driverModel = require('../Schema/TestDriver.js')
const dotenv = require('dotenv').config()




const userSignUp =async (req, res)=>{
    try {
        //destructuring
        const { name , email , phone , password , TandC}=req.body
        
        // validate inputs
        if(!name ||!email || !phone || !password ||!TandC){
            return   res.status(400).json({
                     message:"PROVIDE YOUR NAME, EMAIL, PHONE NUMBER, PASSWORD and check the TandC",
                     error:true,
                     success:false
            })
        }

        const userEmail = await userModel.findOne({email})

        if(userEmail){
            return  res.status(400).json({
                    message:"Email already exists",
                    error:true,
                    success:false
            })
        }

        const tandc = await userModel.findOne({TandC})
        if(tandc === true){
            return  res.status(401).json({
                    message:"Invalid T&C",
                    error:true,
                    success:false
            })
            
        }
        

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const userHashedPassword = await bcrypt.hash(password,  salt);


        //creating a new user
        const newUser = new userModel({
             name,
             email,
             phone,
             password: userHashedPassword,
             TandC,
            isVerified:false
        })

        const save = await newUser.save();
            res.status(201).json({
                message: "User created successfully",
                data: save,
                success: true,
            });

    }catch(error){
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

            

             
const userSignIn =async (req, res)=>{
    
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
           return res.status(400).json({
                message:" PROVIDE EMAIL AND PASSWORD"
            })
        }
        
        //verifying if email exists in database
        const user = await userModel.findOne({email})

        if(!user){
           return res.status(404).json({
                message:"email not found",
                error:true,
                success:false
            })
        }else{
            //compare password
            const comparePasswords = await bcrypt.compare(password, user.password)

            if(!comparePasswords){
                   return res.status(401).json({
                    message:"PROVIDE THE CORRECT EMAIL AND PASSWORD",
                    error:true,
                    success:false
                })
            }else{
                    const token = await jwt.sign(
                        {_id:user._id},
                        "qwerty",
                        {expiresIn : "1d"}
            )
            const {password, ...info} = user._doc;
            res.status(201).json({
                message:"Sign in successful",
                data:{ ...info,token }
            })
            }
        }
        
    } catch (error) {
        //server based
        res.status(500).json({
            message:  error.message ||"Sign in unsuccessfull",
            error:true,
            success:false
        })
    }
}

const driverSignUp =async (req, res)=>{
    try {
        const { fullname , email , phone , password , TandC , carType ,driverLicenceNumber, licenceType}=req.body
        
        // validate inputs
        if(!fullname|| !email|| !phone || !password || !TandC || !carType ||!driverLicenceNumber|| !licenceType){
            return   res.status(400).json({
                     message:"Fill in all the fields, they are all required.",
                     error:true,
                     success:false
            })
        }

        const termsAndCondition = await driverModel.findOne({TandC})
        if(termsAndCondition){
            return  res.status(400).json({
                    message:"Invalid T&C",
                    error:true,
                    success:false
            })
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const driverHashedPassword = await bcrypt.hash(password,  salt);


        //verifying if email already exists or not
        const driverEmail = await driverModel.findOne({email})

        if(driverEmail){
            return  res.status(400).json({
                    message:"Email already exists",
                    error:true,
                    success:false
            })
        }

        //creating a new driver
        const newDriver = new driverModel({
            fullname,
             email,
             phone,
             password: driverHashedPassword,
             TandC,
             carType,
             driverLicenceNumber,
            licenceType
        })
       

        const save = await newDriver.save();
            res.status(201).json({
                message: "User created successfully",
                data: save,
                success: true,
            });

    //server based error
    } catch (error) {
        return res.status(500).json({
            message: error.message||"Sign up unsuccessful" ,
            error:true,
            success:false
        })
    }
}


const driverSignIn =async (req, res)=>{
    try {
        const {fullname, email, password} = req.body

        if(!fullname || !email || !password){
           return res.status(400).json({
                message:" Fill all the fields, they are all required"
            })
        }
        
        //verifying if email exists in database
        const driver = await driverModel.findOne({email})

        if(!driver){
           return res.status(404).json({
                message:"email not found",
                error:true,
                success:false
            })
        }else{
            //compare password
            const comparePasswords = await bcrypt.compare(password, driver.password)

            if(!comparePasswords){
                   return res.status(401).json({
                    message:"PROVIDE THE CORRECT EMAIL AND PASSWORD",
                    error:true,
                    success:false
                })
            }else{
                    const token = await jwt.sign(
                        {_id:driver._id},
                        "qwerty",
                        {expiresIn : "1d"}
            )
            const {password, ...info} = driver._doc;
            res.status(201).json({
                message:"Sign in successful",
                data:{ ...info,token }
            })
            }
        }
        
    } catch (error) {
        //server based
        res.status(500).json({
            message:  error.message ||"Sign in unsuccessfull",
            error:true,
            success:false
        })
    }
}





module.exports = {  userSignUp , userSignIn , driverSignUp , driverSignIn}













