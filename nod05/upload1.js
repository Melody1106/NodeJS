const express = require("express");
const app = express();
const path = require("path")

const fs=require("fs");

const multer=require("multer")
//使用multer指定上傳參數

//使用multer.diskStorage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname + "/public/uploads/")
    },
    filename: function(req, file, cb){
        let timestamp = Date.now();
        let newName = timestamp + path.extname(file.originalname);
        cb(null, newName)
    }
})

const upload = multer({dest: path.resolve(__dirname, "./public")});
//使用multer.diskStorage upload
const upload2 = multer({storage: storage})

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname,"./views"))

app.use(express.static(path.resolve(__dirname , "./public")));

app.get("/", (req, res)=>{
    res.send("首頁");
});
app.get("/form1", (req, res)=>{
    //res.send("表單1");
    res.render("form1");
});
app.get("/form2", (req, res)=>{
    
    res.render("form2");
});
app.get("/form3", (req, res)=>{
    
    res.render("form3");
});
app.post("/upload1", upload.single("myFile") ,(req, res)=>{
       //res.send("收到表單1");
    //製作myFile檔名
    //時間戳記 上傳檔案會製作流水號 作為檔名
    let timestamp = Date.now();
      //console.log(timestamp);
    //製作副檔名
    let newName = timestamp + path.extname(req.file.originalname);
    fs.renameSync(req.file.path, "./public/upload/"+newName)
    req.body.myFile = newName;
    res.json({body: req.body, file: req.file})
});
app.post("/upload2", upload.array("myFile", 3) ,(req, res)=>{
    //使用同一組timestamp 透過forEach取得3組檔名
    let myFiles = [];
    let timestamp = Date.now();
    req.files.forEach((file, index)=>{
        let num = timestamp+index;
        let newName = num + path.extname(file.originalname);
        fs.renameSync(file.path, "./public/upload/"+newName);
        myFiles.push(newName)
    });
    req.body.myFiles = myFiles;


    res.json({body: req.body, files: req.files})
});

app.post("/upload3", upload2.array("myFile"), (req, res)=>{
    res.json({body: req.body, files: req.files});
})


app.listen(3000, ()=>{
    console.log("server is running.");
});