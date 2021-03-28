const jwt = require("jsonwebtoken")
let auth=async(req,resp,next)=>{
        if(req.cookies.token){
            const data= await jwt.verify(req.cookies.token,'ccc')
            req.data=data
            return next()
        }
        return resp.send("please login")
         
    }
export default auth