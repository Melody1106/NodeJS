const express = require("express");
const app = express();
const path = require("path")

const publicName = path.resolve(__dirname+"/public")
app.use(express.static(publicName));

app.get("/", (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end("首頁")
})

app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})