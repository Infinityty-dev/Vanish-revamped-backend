const express = require('express')
const router = express.Router()
const {userSignUp, driverSignUp, driverSignIn, userSignIn} = require('/Vanish-revamped-backend/src/controllers/UserAndDriverController.js')



router.post('/userSignup',userSignUp)
router.post('/userSignin',userSignIn)
router.post('/driverSignup',driverSignUp)
router.post('/driverSignin',driverSignIn)
// router.get("/verify/:token", verifyEmail);
// router.get("/protected", protectedRoute);


module.exports = router