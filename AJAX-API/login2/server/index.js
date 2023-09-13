const express = require("express")
const multer = require("multer")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const secretKey = "benbenben"
const cors = require("cors")
const upload = multer();
const users = require("./users")

// console.log(users); //印出user.js

//設定 cors 用的許可名單
let whitelist = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    undefined
];

let corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

const app = express()
app.use(cors(corsOptions))
//解析 json 格式的要求主體
app.use(express.json())
//解析 URL 編碼的要求主體
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res)=>{
res.send("首頁")
})
app.post("/login", upload.none(), (req, res)=>{
  //console.log(req.body); //解析postman回傳body參數，加上upload.none()解析(multer)
  //解構物件-比對account&password
const {account, password} = req.body
const user = users.find(u=> u.account === account && u.password === password)
console.log(user);
if(user){
  //建立token
  const token = jwt.sign(
    {
      account: user.account,
      name: user.name,
      mail:user.mail,
      head: user.head,
    },
    secretKey,
    {expiresIn: "30m"})
  //如果比對成功回傳訊息
  res.status(200).json({
    status: "success",
    message:"登入成功",
    token
  })
}else{
  res.status(400).json({
    status: "fail",
    message:"帳號或密碼錯誤"})
}
//狀態200表示回傳內容狀態ok
// 使用postman確認回傳內容(json)
})
app.post("/logout", checkToken, (req, res)=>{
console.log(req.decoded);
//登出
const user = users.find(u => u.account === req.decoded.account)
if(user){
   //如果找到user登出重新核發token
   const token = jwt.sign(
    {
      account: "",
      name: "",
      mail:"",
      head: "",
    },
    secretKey,
    {expiresIn: "-10s"})
  res.status(200).json({
    status: "success",
    message:"登出成功",
    token
  })
}else{
  res.status(400).json({
    status: "fail",
    message:"登出失敗請洽管理人員"})
}
})
app.post("/checkLogin",checkToken, (req, res)=>{
  //checkLogin檢查 重新給一組30m後失效token
  const user = users.find(u => u.account === req.decoded.account)
  if(user){
    //建立token
  const token = jwt.sign(
    {
      account: user.account,
      name: user.name,
      mail:user.mail,
      head: user.head,
    },
    secretKey,
    {expiresIn: "30m"})
  //如果比對成功回傳訊息
  res.status(200).json({
    status: "success",
    message:"驗證成功",
    token
  })
  }else{
    res.status(400).json({
      status: "fail",
      message:"請登入"})
  }
})
app.listen(3000, ()=>{
    console.log("Server is running");
})

//建立路由middleware 帶入參數
function checkToken(req, res, next){
   //從logout header請求
   const token = req.headers.authorization
   //console.log(token);
   if(token){
     jwt.verify(token, secretKey, (error, decoded)=>{
       if(error){
         res.status(400).json({message:"登入驗證失效 請重新登入"})
         return false;
       }
       req.decoded = decoded
       next();
     })
   }else{
     res.status(400).json({message:"無驗證資訊 token無效"})
   }
}