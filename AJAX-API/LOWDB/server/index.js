const express = require("express");
const multer = require("multer");
const moment = require("moment");
const cors = require("cors");
//json web token
const jwt = require('jsonwebtoken');
const secretKey = "benbenbenIamben";
const upload = multer();
//loadDB導入
const { v4: uuidv4 } = require('uuid');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// 設定部份
let whitelist = [
    "http://127.0.0.1:3005",
    "http://localhost:3005",
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

// 路由部份
app.get("/", (req, res)=>{
    res.send("首頁");
  });

//使用者登入
app.post("/api/users/login", upload.none(),async (req, res)=>{
   //console.log(req.body);
    // res.status(200).json(
    //         { "message": "Login successful", "token": "abc123xyz"}
    // )
    let user, error
    await usersLogin(req).then(result=>{
        user = result;
    }).catch(err=>{
       // console.log(err);
        error = err;
    
    });
    if(error){
        res.status(400).json({error});
        return false;
    }
    //如果登入成功發token
    const token = jwt.sign(
        {
            account: user.account,
            name: user.name,
            mail: user.mail,
            head: user.head
        },
        secretKey, 
        {expiresIn: "30m"});
    res.status(200).json(
        { message: "Login successful", 
             token: token
            })
  });
//使用者登出
app.post("/api/users/logout",checkToken, async (req, res)=>{
    const token = jwt.sign(
        {
            account: req.decoded.account,
            name: req.decoded.name,
            mail: req.decoded.mail,
            head: req.decoded.head,
        }, 
        secretKey, 
        {expiresIn: "-10s"});
    res.status(200).json(
        {
            message: "Logout successful", 
            token: token
        });
});
//檢查使用者登入狀態
app.post("/api/users/status",checkToken,(req, res)=>{
    const token = jwt.sign(
        {
            account: req.user.account,
            name: req.user.name,
            mail: req.user.mail,
            head: req.user.head,
        },
        secretKey, 
        {expiresIn: "30m"});
   
    res.status(200).json(
            { message: "認證有效",
             token: token}
    )
  });
//新增一個使用者
app.post("/api/users", upload.none(),async(req, res)=>{
    let user, error;
    await usersAdd(req).then(result=>{
        user = result;
    }).catch(err=>{
        err = error;
    })
    if(error){
        res.status(400).json(
            {error}
    )
        return false;
    }
    //成功的回應
    res.status(201).json(
            {"id":user.id, 
            "message": "User created successfully"}
    )

  });
 
  //修改特定 ID 使用者的部分內容
  app.put("/api/users/:id",upload.none(), (req, res)=>{
    let id = req.params.id;
    console.log(req.body);
    res.status(200).json(
       { "message": "User partially updated successfully"}
    )
  });

   //刪除特定 ID 的使用者
   app.delete("/api/users/:id", (req, res)=>{
    let id = req.params.id;
    console.log(req.body);
    res.status(200).json(
       { "message": "User deleted successfully"}
    )
  });


  app.get("/api/users", (req, res)=>{
    res.status(200).json(
        [
            {"id": 1, "name": "Alice", "email": "alice@example.com"},
            {"id": 2, "name": "Bob", "email": "bob@example.com"}
          ]
    )
  });

   //使用 ID 作為搜尋條件來搜尋使用者
   app.get("/api/users/search", (req, res)=>{
    let account = req.query.account;
    res.status(200).json(
        [
            {"id": account, "name": "Alice", "email": "alice@example.com"}
          ]
    )
  });

  app.get("/api/users/:id", (req, res)=>{
    let id = req.params.id;
    res.status(200).json(
        [
            {"id": id, "name": "Alice", "email": "alice@example.com"}
          ]
    )
  });

 
  app.listen(3005, ()=>{
    console.log("server is running");
  });

function usersAdd(req){
    return new Promise((resolve, reject)=>{
        const {account, password, name,mail, head} = req.body;
        //檢查使用者是否已存在
        let result = db.get("user").find({account}).value();
        if(result){
            reject({error: "帳號已經被使用"})
            return false;
        }
        result = db.get("user").find({mail}).value();
        if(result){
            reject({error: "信箱已經被使用"})
            return false;
        }
        let id = uuidv4();
        db.get("user").push({id, account, password, name, head}).write();
        resolve({id});
    })
}

function usersLogin(req){
return new Promise((resolve, reject)=>{
  const {account, password} = req.body
  let result = db.get("user").find({account, password}).value();
//如果有user
if(result){
    resolve(result)
    //console.log(result);
}else{
    reject({error: "帳號或密碼錯誤"})
}
})

    // console.log(req.body);
    // res.status(200).json(
    //         { "message": "Login successful", "token": "abc123xyz"}
    // )
}

  //建立路由middleware 帶入參數
function checkToken(req, res, next){
    //從logout header請求
    const token = req.headers.authorization
    //console.log(token);
    if(token){
      jwt.verify(token, secretKey, (error, decoded)=>{
        if(error){
          res.status(400).json({
            message:"登入驗證失效 請重新登入"})
          return false;
        }
        //成功要做的事
        req.decoded = decoded
        next();
      })
    }else{
      res.status(400).json(
        {
            error:"登入驗證失效 請重新登入"
    })
    }
 }