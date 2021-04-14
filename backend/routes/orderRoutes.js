const express = require('express')
const router = express.Router()
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} = require('../controllers/orderController')
const {protect, admin} = require('../middleware/authMiddleware')

router.post('/',protect, addOrderItems )
router.get('/',protect,admin, getOrders )
router.get('/myorders',protect, getMyOrders )
router.put('/:id/pay',protect, updateOrderToPaid)
router.get('/:id',protect, getOrderById )
router.put('/:id/deliver',protect, admin, updateOrderToDelivered)


module.exports = router