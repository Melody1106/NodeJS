const express = require("express");
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+"/public/uploads/")
    },
    filename:(req, file, cb)=>{
        if(!req.timestamp){
            req.timestamp = Date.now();
            req.fileIndex = 0;
        }else{
            fileIndex++;
        }
       
         let newName= (timestamp+req.fileIndex) +path.extname(file.originalname);

        cb(null, newName);
    }
});
const upload = multer({ dest: path.resolve(__dirname, "./public") });

const upload2= multer({storage: storage});


const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  console.log(req.get("ip"));
  res.send("首頁");
});

app.get("/form1", (req, res) => {
  // res.send("表單1");
  res.render("form1");
});

app.get("/form2", (req, res) => {
  res.render("form2");
});
app.get("/form3", (req, res) => {
  res.render("form3");
});

app.post("/upload1", upload.single("myFile"), (req, res) => {
  // res.send("收到表單");
  let timestamp = Date.now();
  let newName = timestamp + path.extname(req.file.originalname);
  fs.renameSync(req.file.path, "./public/upload/" + newName);
  req.body.myFile = newName;
  res.json({ body: req.body, file: req.file });
});
//-------------------------
//upload.none(); 使用multer但沒有檔案食用
app.post("/upload2", upload.array("myFile", 3), (req, res) => {
  
  let myFiles=[];
    let timestamp = Date.now();
  req.files.forEach((file, index) => {

    let num = timestamp+index;
    let newName = num + path.extname(file.originalname);
    fs.renameSync(file.path, "./public/upload/" + newName);
    myFiles.push(newName);
  });
  req.body.myFiles = myFiles;

  res.json({ body: req.body, files: req.files });
});
//---------------------
app.post("/upload3",upload2.array("myFile"), (req,res)=>{
    res.json({body: req.body, files: req.files})
})

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
