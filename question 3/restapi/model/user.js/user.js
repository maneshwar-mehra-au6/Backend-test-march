const mongoose =require("mongoose")

const subDocument=mongoose.Schema({
    status:{
        type:Boolean,
        default:false
    },
    title:String
})




const Schema=mongoose.Schema({
    name:String,
    profileImage:String,
    coverImage:String,
    Address:String,
    mobileNo:String,
    email:String,
    Document:[subDocument],
    date:{
        type:Date,
        default:Date.now()
    }
})

export const user= mongoose.model("user",Schema)
