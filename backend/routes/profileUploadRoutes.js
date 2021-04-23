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
router.post('/', upload.single('File'), async(req, res) =>{
    const fname = req.file.path.split('\\')
    const len = fname.length
    const profile = await Profile.find({})
    profile[0].cv = fname[len - 1]
    await profile[0].save()
})

module.exports = router