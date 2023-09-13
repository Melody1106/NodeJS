const express = require("express")
const multer =require("multer")
const jwt = require("jsonwebtoken")
const secretKey = "benbenben"
const users = require("./users")
//console.log(users);
const moment = require("moment")
const cors = require("cors")
const upload = multer();


let whitelist = ["http://127.0.0.1:5500","http://127.0.0.1:3000",
"http://localhost:5500",
"http://localhost:3000",undefined];

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
  app.use(express.json())
  app.use(express.urlencoded({extended:true}));

  app.get("/",(req,res)=>{
    res.send("首頁")
  })
  app.post("/login", upload.none(),(req,res)=>{
    //測試postman
    //console.log(req.body);
    const {account, password} = req.body;
    const user = users.find( u=> u.account === account && u.password === password)
    console.log(user);
    //等於在資料庫搜尋會員資料語法 postman測試 account:user1 password: user1

    if(user){
        //建立token
        const token = jwt.sign({
            account: user.account,
            name: user.name,
            mail: user.mail,
            head: user.head,
        }, 
        secretKey,
        //期限30min
        {expiresIn:"30m"})
        res.status(200).json({
            //狀態判斷
            status: "success",
            message: "登入成功",
            token
        })
    }else{
        res.status(400).json({
            status: "fail",
            message: "帳號密碼錯誤"})
    }
    //如果成功 回傳訊息login success
  })

  app.post("/logout", checkToken, (req, res)=>{
    const user = users.find(u=> u.account === req.decoded.account);
    if(user){
        const token = jwt.sign(
            {
                account: "",
                name: "",
                mail: "",
                head: "",
            }, 
            secretKey, 
            {expiresIn: "-10s"});
        res.status(200).json({
            status: "success",
            message: "登出成功",
            token
        });
    }else{
        res.status(400).json({
            status: "fail",
            message: "登出失敗，請稍後再試"
        });
    }
  });
   
  

  app.post("/checkLogin",checkToken ,(req,res)=>{
    const user = users.find(u=> u.account === req.decoded.account);
    if(user){
         //檢查狀態 重新給token
         const token = jwt.sign({
            account: user.account,
            name: user.name,
            mail: user.mail,
            head: user.head,
        }, 
        secretKey,
        //期限30min
        {expiresIn:"30m"})
        res.status(200).json({
            //狀態判斷
            status: "success",
            message: "驗證成功 token OK",
            token
        })

    }else{
        res.status(400).json({
            status: "fail",
            message: "請登入"
        });
    }
  })

  app.listen(3000, ()=>{
    console.log("server is running");
  })

  //--------
  function checkToken(res, req, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secretKey, (error, decoded)=>{
            if(error){
                res.status(400).json({
                    status: "fail",
                    message: "登入驗證失效 請重新登入"})
                    return false;
            }
                req.decoded = decoded;
                next();

        })
     
    }else{
        res.status(400).json({
            status: "fail",
            message: "無登入資料，請重新登入"})
    }
 
  }