const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const connectDB   = require('./config/db')
const productRoutes   = require('./routes/productRoutes')
const userRoutes   = require('./routes/userRoutes')
const orderRoutes   = require('./routes/orderRoutes')
const uploadRoutes   = require('./routes/uploadRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const Razorpay = require('razorpay')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

var razorpay = new Razorpay({
    key_id: process.env.REACT_APP_KEY_ID,
    key_secret: process.env.KEY_SECRET
})

app.get('/', (req, res) =>{
    res.send("API is running")
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//This makes uploads folder as static so we can access from the browser 
//let __dirname = path.resolve()
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

// app.post('/razorpay', async (req, res) =>{
    
// })
//app.use(notFound)
//app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))