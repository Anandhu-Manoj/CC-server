const mongoose=require('mongoose')


const CriminalSchema=new mongoose.Schema({

    criminalimage:{
        type:String,
        requied:true
    },
    criminalname:{
        type:String,
        requied:true
    },
    criminalfathersName:{
        type:String,
        requied:true
    },
    CriminalIdentificationMark:{
        type:String,
        requied:true
    },
    CNumber:{
        type:String,
        requied:true,
        unique:true
    },
    TotalYearsofSentence:{
        type:String,
        requied:true
    },
    AdmittedDate:{
        type:String,
        requied:true
    },
    RelievingDate:{
        type:String,
        requied:true
    },

})

const Criminals=mongoose.model('Criminals',CriminalSchema)

module.exports=Criminals