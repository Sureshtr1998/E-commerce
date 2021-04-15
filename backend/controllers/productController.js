const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


    const getProducts = asyncHandler(async(req,res) =>{

        const pageSize = 10
        const page = Number(req.query.pageNumber) || 1


        const keyword = req.query.keyword ? {
            name:{
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {}
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
        res.json({products, page, pages: Math.ceil(count / pageSize)})
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
           image: '/images/default.png',
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



    const createProductReview = asyncHandler(async(req,res) =>{
        const {rating, comment} = req.body
        let checkUser = false
        const product = await Product.findById(req.params.id)
        //const alreadyReviewed = await product.reviews.map(review => { console.log(review.user, req.user._id)})
        checkUser = await product.reviews.filter(review => review.user.toString() === req.user._id.toString())
        if(product){
          //const alreadyReviewed = product.reivews.find(r => r.user.toString() === req.user._id.toString())
             if(checkUser.length){
                 res.status(400).send('Product already reviewed')
             }
             else{
                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user._id
                }
                product.reviews.push(review)
                product.numReviews = product.reviews.length
    
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/ product.reviews.length
    
                await product.save()
                res.status(201).send('Review Added')
             }

        } else {
            res.status(404).send('Product Not Found')
        }
  
         
      })
  
  
      


    const getTopProducts = asyncHandler(async(req,res) =>{
            const products = await Product.find({}).sort({rating: -1}).limit(3)
            res.json(products)
         
      })
  


module.exports = {getProductById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts}