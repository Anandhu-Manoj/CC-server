const express=require('express')

const cController =require('../Controllers/cController')

const router=express.Router()



router.post('/register',cController.regCivilianController)



module.exports =router


