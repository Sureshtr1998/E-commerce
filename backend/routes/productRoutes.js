const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const router = express.Router()

router.get('/', asyncHandler(async(req, res) =>{
    const products = await Product.find({})
    res.json(products)
})
)

router.get('/:id', asyncHandler(async(req, res) =>{
    try{
    const product = await Product.findById(req.params.id)
        res.json(product)
    }
    catch(error){
        res.status(404)
        throw new Error('Product Not Found')
    }
})
)


module.exports = router