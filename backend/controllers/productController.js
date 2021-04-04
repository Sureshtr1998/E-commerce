const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


    const getProducts = asyncHandler(async(req,res) =>{
        const products = await Product.find({})
        res.json(products)
    })

    const getProductById = asyncHandler(async(req,res) =>{
        try{
            const product = await Product.findById(req.params.id)
                res.json(product)
            }
            catch(error){
                res.status(404).send('Product Not Found')
                // throw new Error('Product Not Found')
            }
    })

module.exports = {getProductById, getProducts}