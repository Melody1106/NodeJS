const fs=require("fs");
const path = require("path");

const express = require("express");
const app = express();
const moment=require("moment");
const { error } = require("console");
const logFile = path.resolve(__dirname+"/access.txt");

let recordLogMiddleware = (req, res, next)=>{
    let {url, ip}=req;
    let datetime = moment().format("YYYY-MM-DDTHH:mm:ss")
    console.log(datetime);
    fs.appendFile(logFile, `${datetime} ${url} ${ip}\r\n`, error=>{
     if(error){
         console.log("寫入失敗");
         return false
     }
     console.log("寫入成功");
    });
    next();
}

app.use(recordLogMiddleware);

app.get("/", (req, res)=>{
   
    res.send("首頁")
})
app.get("/home", (req, res)=>{
   
   console.log(url, ip);
  
    res.send("主頁-home")
})
app.get("/login", (req, res)=>{
   
    res.send("登陸頁-login")
})

app.all("*",(req, res)=>{
    res.status(404).send("<h1>404 NOT FOUND.</h1>")
});

app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})