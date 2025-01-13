const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const nodemailer = require('nodemailer')
const userModel = require('../schema/TestUser.js')
const driverModel = require('../schema/TestDriver.js')
require('dotenv').config()
// const { sendVerificationEmail } = require("../utils/email");




// Transporter for nodemailer
// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false, // use true for 465, false for other ports
//     auth: {
//       user: process.env.MY_EMAIL,
//       pass: process.env.MY_EMAIL_PASSWORD,
//     },
//   });



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


        // // Generate a token
        //  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        //  // Send verification email
        // await sendVerificationEmail(email, token);
        // res.status(200).send("Verification email sent");




        const tandc = await userModel.findOne({TandC})
        if(tandc){
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
        console.error(error);
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
                        {expiresIn : "7d"}
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





module.exports = { userSignUp , userSignIn , driverSignUp , driverSignIn}













