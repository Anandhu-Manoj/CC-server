const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./complaints')

    },
    filename:(req,file,callback)=>{
        callback(null,`pdf-${file.originalname}`)

    }

})
const serviceMulterMiddleWare=multer({storage})
module.exports=serviceMulterMiddleWare