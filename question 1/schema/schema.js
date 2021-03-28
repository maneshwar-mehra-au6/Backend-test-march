const mongoose= require("mongoose")
const userSchema=mongoose.Schema({
    email:{
        type:String,
        require:[true,"enter the email"]
    },
    password:{
        type:String,
        required:[true,"enter the password"]
    }
})
export let user=mongoose.model("user",userSchema)
// console.log(user)