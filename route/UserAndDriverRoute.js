const express = require('express')
const router = express.Router()
const {userSignUp, driverSignUp, driverSignIn, userSignIn} = require('../controller/UserAndDriverController')



router.post('/userSignup',userSignUp)
router.post('/userSignin',userSignIn)
router.post('/driverSignup',driverSignUp)
router.post('/driverSignin',driverSignIn)


module.exports = router