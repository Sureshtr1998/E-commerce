const express = require('express')
const {authUser, getUserProfile, registerUser, updateUserProfile} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)



module.exports = router