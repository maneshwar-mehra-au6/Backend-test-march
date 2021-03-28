const mongoose=require("mongoose")
const mongoURI="mongodb://localhost:27017/test"
const connect=async()=>{
    try{
        await mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true })
        console.log("connect")
    }
    catch(e){
        console.log("some error in connecting ",e.message)
    }
}

export default{connect}