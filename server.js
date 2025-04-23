require('dotenv').config()
const express=require('express');
const cors=require('cors')

const ccServer=express()
const Router=require('./routes/routes')

ccServer.use(cors())
ccServer.use(express.json())
require('./Database/dbConnection')
ccServer.use(Router)


const PORT=3000||process.env.PORT

ccServer.listen(PORT,()=>{
    console.log(`server running succesfully in ${PORT} and wating for client request`)
})