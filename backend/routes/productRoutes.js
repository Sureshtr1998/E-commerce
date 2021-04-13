const express = require('express')
const {getProducts, getProductById, deleteProduct,createProduct, updateProduct} = require('../controllers/productController')
const {protect, admin} = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/',).get(getProducts)
router.post('/', protect, admin, createProduct)
router.route('/:id',).get(getProductById)
router.delete('/:id',protect, admin, deleteProduct)
router.put('/:id',protect, admin, updateProduct)


module.exports = router