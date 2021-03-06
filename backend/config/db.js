const mongoose = require("mongoose")


const connectDB = async() =>{

    try{
        // await mongoose.connect(process.env.MONGO_URI,{
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true,
        //     useCreateIndex: true
        // })
        // you can use process.env.MONGO_URI_LOCAL also take a look in .env file
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }

    catch(err){
        console.log(`Error: ${err}`)
        process.exit(1)
    }
}

module.exports = connectDB