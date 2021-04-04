const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')


    const authUser = asyncHandler(async(req,res) =>{
     
        const {email, password} = req.body
        
        const user = await User.findOne({ email: email})

        if(user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(401).send('Invalid Email & Password')
            
            //throw new Error('Invalid Email & Password')
        }
       
    })

    const registerUser = asyncHandler(async(req,res) =>{
     
        const {name , email, password} = req.body
        
        const userExists = await User.findOne({ email: email})

        if(userExists){
            res.status(400).send("User already exists")
            //throw new Error("User already exists")
        }

        const user = await User.create({
            name,
            email,
            password
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        }
        else{
            res.status(400).send('Invalid User data')
            // throw new Error('Invalid User data')
        }
       
    })

    const getUserProfile = asyncHandler(async(req,res) =>{
        const user = await User.findById(req.user._id)
        if(user){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })

        } else {
             res.status(404).send('User Not Found')
            //  throw new Error('User Not Found')
            }
    })

module.exports = {authUser, getUserProfile, registerUser}