const mongoose = require("mongoose")
let url="mongodb://localhost:27017/paper"
let connect=()=>{
    try{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
        console.log("connected")
    }
    catch(e){
        console.log(e.message)
    }
}
export default connect