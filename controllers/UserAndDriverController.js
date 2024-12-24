const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




const userSignUp =async (req, res)=>{
    try {
        const { name , email , password }=req.body
        
        // validate inputs
        if(!name || !email || !password){
            return   res.status(400).json({
                     message:"PROVIDE YOUR NAME, EMAIL, PASSWORD"
            })
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const userHashedPassword = bcrypt.hash(password,  salt);


        //verifying if email already exists or not
        const userEmail = await userModel.findOne({email})

        if(userEmail){
            return  res.status(400).json({
                    message:"Email already exists",
                    error:true,
                    success:false
            })
        }

        //adding new user to database
        const newUser = new userModel({
            name,
            email,
            password: userHashedPassword
        })



    } catch (error) {
        return res.status(500).json({
            message:"Sign up unsuccessful" || error,
            error:true,
            success:false
        })
    }
}

const userSignIn =async (req, res)=>{
    
    try {
        const {email, password} = req.body

        if(!email || !password){
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
            const comparePasswords = await bcrypt.compare(password, userEmail.password)

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
            message:"Sign in unsuccessfull" || error.message,
            error:true,
            success:false
        })
    }
}

const driverSignUp =async (req, res)=>{
    try {
        const { name , email , password }=req.body
        
        // validate inputs
        if(!name || !email || !password){
            return  res.status(400).json({
                message:"PROVIDE YOUR NAME, EMAIL, PASSWORD"
            })
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const driverHashedPassword = bcrypt.hash(password,  salt);


        //verifying if email already exists or not
        const driverEmail = await driverModel.findOne({email})

        if(driverEmail){
            return   res.status(400).json({
                message:"Email already exists",
                error:true,
                success:false
            })
        }

        //adding new user to database
        const newDriver = new driverModel({
            name,
            email,
            password: driverHashedPassword
        })



    } catch (error) {
        return  res.status(500).json({
            message:"Sign up unsuccessful" || error,
            error:true,
            success:false
        })
    }
}

const driverSignIn =async (req, res)=>{
    try {
        const {email, password} = req.body

        if(!email || !password){
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
            const comparePasswords = await bcrypt.compare(password, userEmail.password)

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
            message:"Sign in unsuccessfull" || error.message,
            error:true,
            success:false
        })
    }
}








module.exports = { userSignUp , userSignIn , driverSignUp , driverSignIn}













