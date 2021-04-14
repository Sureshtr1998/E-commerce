const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')


    const addOrderItems = asyncHandler(async(req,res) =>{
       const { orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice} = req.body

        if(orderItems && orderItems.length === 0){
            res.status(400).send('No order items')
        } else {
            const order = new Order({
                orderItems, 
                user: req.user._id,
                shippingAddress, 
                paymentMethod, 
                itemsPrice, 
                taxPrice, 
                shippingPrice, 
                totalPrice
            })

            const createdOrder = await order.save()

            res.status(201).json(createdOrder)
        }

    })




const getOrderById = asyncHandler(async(req,res) =>{
    //Name and email will be taken from user model and attached it to here
       const order = await Order.findById(req.params.id).populate('user', 'name email')
       if(order){
           res.json(order)
       } else {
           res.send('Order not found')
       }

     })


const updateOrderToPaid = asyncHandler(async(req,res) =>{
        //Name and email will be taken from user model and attached it to here
        let time = Date();
        const today = time.toString()
           const payment_id = req.body.paymentId
           const order = await Order.findById(req.params.id)
           //console.log(req.body.paymentId,order )
           if(order){
               order.isPaid = true
               order.paidAt= Date.now();
               order.paidFormattedTime = today
               order.payment_id = payment_id
            //    order.paymentResult={
            //        id: req.body.id,
            //        status: req.body.status,
            //        update_time: req.body.update_time,
            //        email: req.body.payer.email_address
            //    }

               const updateOrder = await order.save()

               res.json(updateOrder)
           } else {
               res.send('Order not found')
           }
    
         })

const getMyOrders = asyncHandler(async(req,res) =>{
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})
    



const getOrders = asyncHandler(async(req,res) =>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})
    



const updateOrderToDelivered = asyncHandler(async(req,res) =>{
  
    const order = await Order.findById(req.params.id)
       //console.log(req.body.paymentId,order )
       if(order){
           order.isDelivered = true
           order.deliveredAt = Date.now();
         
        //    order.paymentResult={
        //        id: req.body.id,
        //        status: req.body.status,
        //        update_time: req.body.update_time,
        //        email: req.body.payer.email_address
        //    }

           const updateOrder = await order.save()

           res.json(updateOrder)
       } else {
           res.send('Order not found')
       }

     })



module.exports = {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered}