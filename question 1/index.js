import "babel-polyfill"
import connect from "./connect/connect"
import route from "./route"
const server=require("express")
const cookiePraser=require("cookie-parser")
const session= require("express-session")
const bodyPraser=require("body-parser")
connect()
const app=server()
app.use(server.json())
app.use(server.urlencoded({extended:true}))
app.use(cookiePraser())
app.use(session({
    secret:"111"
}))
app.use(route)
// console.log(route)
app.get('/',(req,resp)=>{
    resp.send("health check")
})
app.listen(2000,()=>{
    console.log("listen at prot no. 2000")
})