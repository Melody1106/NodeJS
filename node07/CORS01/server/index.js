const express = require("express");
const cors = require("cors");
const multer = require("multer");
const session = require("express-session");
const upload = multer();
let whitelist = ["http://127.0.0.1:5500", "http://localhost:3000"];
let corsOptions = {
    credentials: true,
    origin: (origin, callback)=>{
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('不允許傳遞資料'))
      }
    }
  }

const users = {
    "ben": {
        pwd: "a12345",
        name: "Ben Chen"
    },
    "mery": {
        pwd: "a12345",
        name: "Mery Lin"
    }
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1200000
    }
  }))

app.get("/", (req, res)=>{
    res.send("首頁");
});

app.get("/checkLogin", (req, res)=>{
    console.log(req.session.user);
    let user = req.session.user;
    res.json({msg: "welcome", user: user});
});

app.post("/", upload.none(), (req, res)=>{
    const userID = req.body.userID;
    const userPWD = req.body.userPWD;
    if(users[userID] && users[userID].pwd === userPWD){
        let user = {
            id: userID,
            name: users[userID].name
        }
        req.session.user = user;
        console.log(req.session.user);
        res.json({msg: "welcome", user: user});
    }else{
        res.json({msg: "login failed"});
    }
})

app.listen(3000, ()=>{
    console.log("server is running.");
})