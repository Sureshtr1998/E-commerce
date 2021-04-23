const express = require('express')
const path = require('path')
const multer = require('multer')
const Profile = require('../models/profileModel')

const router= express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'frontend/public/CV')
    },
    filename(req, file, cb){
        //null for the error in cb
        cb(null, `CV${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    const filetypes = /pdf|PDF/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }
    else{
        cb('PDF only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})
//single for single image
router.post('/', upload.single('File'), (req, res) =>{
    Profile.cv = `/${req.file.path}`
    res.send(`/${req.file.path}`)
})

module.exports = router