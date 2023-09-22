const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true , 'must provide a name'],
        trim:true,
        maxLength:[20 , 'name can not be more than 20 char']
    },
    completed: {
        type:Boolean,
        default:false,
        required:true,  
    }
})

module.exports= mongoose.model('Task' , TaskSchema)
