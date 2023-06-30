const mongoose = require('mongoose')
const {Schema}=mongoose;

const commentSchema=new Schema({
    userID:{
        type:mongoose.ObjectId,
        ref:"User",
        required:true
    },
    newsID:{
        type:mongoose.ObjectId,
        ref:"News",
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{ timestamps: true })
module.exports =mongoose.model("comment",commentSchema)