const express = require('express')
const {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} = require('../controllers/userController')
const {protect, admin} = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', registerUser)
router.get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.delete('/:id', protect, admin,deleteUser )
router.get('/:id', protect, admin,getUserById )
router.put('/:id', protect, admin,updateUser )


module.exports = router