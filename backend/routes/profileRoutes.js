const express = require('express')
const {protect, admin} = require('../middleware/authMiddleware')
const router = express.Router()
const {profileDetail,getAllDetail} = require('../controllers/profilecontroller')

router.post('/', profileDetail)
router.get('/', getAllDetail)



module.exports = router