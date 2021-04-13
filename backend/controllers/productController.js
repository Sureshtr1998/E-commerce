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




    const deleteProduct = asyncHandler(async(req,res) =>{
        try{
            const product = await Product.findById(req.params.id)

            if(product){
                await product.remove()
                res.send('Product Removed')
            }
                
            }
            catch(error){
                res.status(404).send('Product Not Found')
                // throw new Error('Product Not Found')
            }
    })



    const createProduct = asyncHandler(async(req,res) =>{
       const product = new Product({
           name: 'Product Name',
           price: 1,
           user: req.user._id,
           image: '/images/product.jpg',
           brand: 'Product Brand',
           category: 'Product Category',
           countInStock: 1,
           numReviews: 0,
           description: 'Product Description'
       })

       const createdProduct = await product.save()
       res.status(201).json(createdProduct)
    })


    const updateProduct = asyncHandler(async(req,res) =>{
      const {name, price, description, image, brand, caregory, countInStock} = req.body

      const product = await Product.findById(req.params.id)

      if(product){
          product.name = name
          product.price = price
          product.description = description
          product.image = image
          product.brand = brand
          product.caregory = caregory
          product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

      } else {
          res.status(404).send('Product Not Found')
      }

       
    })


module.exports = {getProductById, getProducts, deleteProduct, updateProduct, createProduct}