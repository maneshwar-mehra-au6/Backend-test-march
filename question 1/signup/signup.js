import { validationResult } from "express-validator"
import {user} from "../schema/schema"
let jwt=require("jsonwebtoken")

let signup={
    postsignup:async(req,resp)=>{
        try{
            // validate(req.body)
        let userFind=await user.findOne({email:req.body.email})

        
        if(!userFind){
            let newUser= new user({
                ...req.body
            })
            await newUser.save()
            let token=jwt.sign({id:newUser._id},"ccc")
            resp.cookie('token',token)
            console.log(resp.cookie)
            resp.json(newUser)
        }
        else{
            return resp.json({
                ...req.body,
                msg:"user is alredy preseent"
            })
        }
        }
        catch(e){
            console.log(e.message)
        }
        
    }
}
export default signup