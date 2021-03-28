import signup from "./signup/signup"
import login from "./login/login"
import auth from "./validation/auth"
import {user} from "./schema/schema"
let jwt=require("jsonwebtoken")
console.log(auth)
const express=require("express")
const route=express.Router()
route.post("/signup",signup.postsignup)
route.post("/login",login.postlogin)
// console.log(signup)
route.post("/token",auth,async(req,resp)=>{
    let userFind= await user.findOne({_id:req.data.id})
    let token= await jwt.sign({id:userFind._id},"zzz")
    return resp.json({
        token,
        msg:"regernated token"
    })
})

route.get('/clear',(req,resp)=>{
    resp.clearCookie("token")
    resp.json({
        msg:"cookie clear session clear"
    })
})
export default route
