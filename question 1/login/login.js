
import {user} from "../schema/schema"
let jwt=require("jsonwebtoken")

let login={
    postlogin:async(req,resp)=>{
        try{
            // validate(req.body)
        let userFind=await user.findOne({email:req.body.email})

        
        if(userFind){
            // console.log(userFind,req.body)
            if(userFind.password==req.body.password){
            let token= await jwt.sign({id:userFind._id},"ccc")
            resp.cookie('token',token)
            
            return resp.json(userFind)
            }
            return resp.json("Enter the correct password")
        }
        else{
            return resp.json({
                ...req.body,
                msg:"please signup"
            })
        }
        }
        catch(e){
            console.log(e.message)
        }
        
    }
}
export default login