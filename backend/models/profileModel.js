const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    age:{
        type: String
    },
    yrs:{
        type: String
    },
    min:{
        type: String
    },
    max:{
        type: String
    },
    cv:{
        type: String
    }

})

const Profile = mongoose.model('Profile', profileSchema)


module.exports = Profile