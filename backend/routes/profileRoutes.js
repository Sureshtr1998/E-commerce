const express = require('express')
const router = express.Router()
const {profileDetail,getAllDetail} = require('../controllers/profilecontroller')

router.post('/', profileDetail)
router.get('/', getAllDetail)



module.exports = router