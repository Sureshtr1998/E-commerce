const Profile = require('../models/profileModel')
const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const profileDetail = asyncHandler(async(req,res) =>{
    const {age, yrsofexp, min, max} = req.body
    await Profile.deleteMany()
    const profile = await Profile.create({
        age,
        yrs:yrsofexp, 
        min, 
        max
    })
    if(profile){
        res.status(201).json({
            age: profile.age,
            yrsofexp: profile.yrs,
            min: profile.min,
            max: profile.max
        })
    }
    else{
        res.status(400).send('Invalid')
        // throw new Error('Invalid User data')
    }   
})

const getAllDetail = asyncHandler(async(req,res) =>{ 
    const profile = await Profile.find({})
    if(profile)
    {
    res.status(200).send(profile)
    }
    else {
        res.status(400).send("Not accessible")
    }
})

module.exports = {profileDetail, getAllDetail}