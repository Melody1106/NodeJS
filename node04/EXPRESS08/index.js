const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end("首頁")
})
app.get("/home", checkCodeMiddleware, (req, res)=>{
    res.send("前台首頁")
})
//路由middleware 可以放多組
// app.get("/admin", middle1, middle2, middle3, (req, res)=>{
//  res.send("後台首頁");
// })

app.get("/admin", checkCodeMiddleware, (req, res)=>{
 res.send("後台首頁");

})
app.get("/setting", checkCodeMiddleware, (req, res)=>{
    res.send("設定頁面")
})

app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})

function checkCodeMiddleware(req, res, next){
    let code = req.query.code;
    //console.log(code);
    if(code === "464"){
       next();
    }else{
        res.send("沒有權限")
    }
    
}