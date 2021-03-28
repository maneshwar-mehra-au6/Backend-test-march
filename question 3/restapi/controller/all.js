let express=require("express")
const mongoose=require("mongoose")
import { check, validationResult } from 'express-validator';
import { user } from '../model/user.js/user';
const jwt=require("jsonwebtoken")
const route=express.Router()
const path =require("path")
let arth=(req,resp,next)=>{
    const token=req.header('token')
    if(!token){
        return resp.json({
            message:"please login"
        })
    }
    try {
        const decode=jwt.verify(token,"CUP_KEY")
        req.userid=decode.user_id.id
        next()
    } catch (error) {
        console.log("somthing error",error.message)
        return resp.json({
            msg:"please provide a valid token"
        })
    }
}

const multer =require("multer")

const diskStroage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,"/../upload"))
    },
    filename:function(req,file,callback){
        let fileName=file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        if(file.fieldname=='profileImage'){
            req.profile=fileName
        }
        if(file.fieldname=='coverImage'){
            req.cover=fileName
        }
        callback(null,fileName)
    }
})

const upload=multer({storage:diskStroage})


route.post('/signup',
upload.fields([{
    name: 'profileImage', maxCount: 1
  }, {
    name: 'coverImage', maxCount: 1
  }]),
[
    check("name","enter the name").not().isEmpty(),
    check("email","enter the email").isEmail(),
    check("mobileNo","enter the valid Mobile numeber minimum of length 10").isLength({ min: 10 })
],
async(req,resp)=>{
    try{
    let error=validationResult(req)
    if(!error.isEmpty()){
        return resp.json({
            error:error.array(),
            msg:"not inserted"
        })
    }
    let findUse=await user.find({email:req.body.email})
    if(findUse.length!=0){
        return resp.json({
            email:req.body.email,
            msg:"email is alredy exist"
        })
    }
    let mobile=await user.find({mobileNo:req.body.mobileNo})
    if(mobile.length!=0){
        return resp.json({
            mobile:req.body.mobileNo,
            msg:"mobile number is alredy present"
        })
    }
    let saved= new user({
        ...req.body,
        profileImage:req.profile,
        coverImage:req.cover
    })
    await saved.save()
    return resp.json({
        msg:"saved user"
    })
}
catch(e){
    console.log(e.message)
}
})


route.post('/login',async(req,resp)=>{
    let userFind=await user.find({email:req.body.email,mobileNo:req.body.mobileNo})
    // console.log(userFind)
    if(userFind.length==0){
        return resp.json({
            ...req.body,
            msg:"enter the correct email or password"
        })
    }
    jwt.sign({
        user_id:{id:userFind[0]._id}
    },"CUP_KEY",(error,token)=>{
        if(error)throw error;
        return resp.json({
            data:token,
            error:[],
            message:"data Fetched"
        })

    })

})
 
route.get('/profile',arth,async(req,resp)=>{
    try{
    let person=await user.findById(req.userid)
    console.log(req.userid)
    return resp.json(person)
    }
    catch(e){
        return resp.json("somthing error")
    }
})


route.post('/remove',arth,async(req,resp)=>{
    let person=await user.findById(req.userid)
    person.profileImage=""
    person.coverImage=""
    await person.save()
    return resp.json({
        userdetail:person,
        msg:"profile and cover photo will remove"
    })
})


route.post('/update',arth,
    upload.fields([{
        name: 'profileImage', maxCount: 1
      }, {
        name: 'coverImage', maxCount: 1
      }]),
async(req,resp)=>{
    let person=await user.findById(req.userid)
    person.name=req.body.name,
    person.mobileNo=req.body.mobileNo,
    person.profileImage=req.profile
    person.coverImage=req.cover
    await person.save()
    return resp.json({
        user:person,
        msg:"data updated"
    })

}
)
route.post("/addTodo",[

    arth],
    async function(req,resp){
        try{
        let USER= await user.findById(req.userid)
        if(USER){
            USER.Document.push({title:req.body.title})
        }
        await USER.save()
        return resp.json({
            data:USER,
            error:[],
            message:"todo Added"
        })
    }
        catch(e){
                console.log("error",e.message)
                resp.send('Error in fetching')
        }
    }
)

route.patch('/UPDATE/:id',arth,
async(req,resp)=>{
    try{
   await user.findOneAndUpdate({
       "_id":req.userid,"Document._id":req.params.id
   },
   {
       $set:{
        "Document.$":{
            title:req.body.title
        }
       }
   },
   async(error,items)=>{
    items=await user.findById(req.userid)
    resp.json(items)
   }
   )
}
catch(e){
    console.log("error",e.message)

}}
)


route.delete('/delete/:id',
arth,
async(req,resp)=>{
    try{
    let USER= await user.findById(req.userid)
    if(!USER){
        return resp.json({
            data:[],error:[],
            message:"no item found "
        })
    }
     USER.Document.id(req.params.id).remove()
     await USER.save()
    return resp.json({
        data:[],
        error:[],
        user:USER,
        message:"deleted"
    })
    }
    catch(e){
        console.log("error",e.message)
    }
}
)


export default{route}