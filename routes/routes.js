const express=require('express')

const cController =require('../Controllers/cController')
const multerMiddleWare=require('../Middleware/multerMiddleWare')

const router=express.Router()



router.post('/register',multerMiddleWare.single("adhaarImg"),cController.regCivilianController)
router.post('/login',cController.civilianLogin)



module.exports =router


