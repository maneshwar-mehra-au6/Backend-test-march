import "babel-polyfill"
const path=require("path")
import bodypraser from "body-parser"
import connect from "./restapi/model/connect"
import route  from "./restapi/controller/all"
connect.connect()

const server = require("express")
const app=server()
app.use(bodypraser.json())
app.use(bodypraser.urlencoded({extended:true}))
app.use(server.static(path.join(__dirname,"/restapi/upload")))
app.use(route.route)


app.get("/",(req,resp)=>{
    resp.send("<h1>health check</h1>")
})
app.listen(2000,()=>{
    console.log("listing at 2000")
})

