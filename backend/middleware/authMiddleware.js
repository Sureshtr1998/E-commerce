const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async( req, res , next) =>{
    let token = req.headers.authorization 

   if( token && token.startsWith('Bearer')){

    try{
       let woBear = token.split(' ')[1]
       const decoded = jwt.verify(woBear, process.env.JWT_SECRET )
       req.user = await User.findById(decoded.id).select('-password')
       next()
    }
    catch(err){
        console.log(err)
        res.status(401).send('Not authorized, token failed')
    }
   }
   else{
       res.status(401).send('Not authorized')
   
   }
})

const admin = (req,res,next) => {

    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401).send('Not Authorized as an Admin')
    }

}

module.exports = {protect, admin}