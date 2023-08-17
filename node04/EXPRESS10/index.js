const express = require("express");
const app = express();
const path = require("path")
//const bodyParser = require("body-parser")
//將來可以不用安裝，直接使用express取代p=body-parser

const publicName=path.resolve(__dirname,"/public")
app.use(express.static(publicName))

//body-parser全域的使用方式
// app.use(bodyParser.urlencoded({ extended: false }));
//路由middleware的使用方式
//let urlencodedParser = bodyParser.urlencoded({ extended: false })
let urlencodedParser = express.urlencoded({ extended: false })

app.get("/", (req, res)=>{
  
    res.send("首頁")
})
app.get("/login", (req, res)=>{
  
    //res.send("顯示表單")
    //01
    // let file = path.resolve(__dirname+"/public/form.html")
    // res.sendFile(file)
    //02
    //redirect 到此路徑 所以是 http://localhost:3000/form.html
    res.redirect("/form.html") 
})


app.post("/login", urlencodedParser, (req, res)=>{
  console.log(req.body);
    res.send("取得表單資訊")
})

app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})