const mongoose = require('mongoose')
const {Schema}=mongoose;

const newsSchema=new Schema({
    userID:{
        type:mongoose.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   
    

},{ timestamps: true })
module.exports =mongoose.model("News",newsSchema)