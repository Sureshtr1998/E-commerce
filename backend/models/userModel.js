const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {

    // Automatically takes the encrypted passowrd when we call this.password
    return await bcrypt.compare(enteredPassword, this.password)
}

//Pre save will execute before anything get saved in the schema part (it can be create methpod also)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)


module.exports = User