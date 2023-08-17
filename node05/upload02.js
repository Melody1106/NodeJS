const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable")

const app=express()
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res)=>{
    res.send("首頁");
})
app.get("/form4", (req, res)=>{
    res.render("form4")
})

app.post("/upload4", (req,res)=>{
    const form = formidable({
        uploadDir: __dirname+"/public/uploads2/",
        keepExtensions: true,
        multiples: true //多張上傳
    });
    form.parse(req,(error, fields, files)=>{
        if(error){
            next(error);
            return false;
        }
        res.json({fields, files});
    })
})


app.listen(3000, () => {
    console.log("server is running http://localhost:3000");
  });