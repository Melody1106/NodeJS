const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="/photo/16063554">
        <img style="height: 400px;" src="https://images.pexels.com/photos/16063554/pexels-photo-16063554.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load " alt="">
        </a>
        <a href="/photo/16211087">
            <img style="height: 400px;" src="https://images.pexels.com/photos/16211087/pexels-photo-16211087.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load " alt="">
        </a>
        <a href="/photo/13554928">
            <img style="height: 400px;" src="https://images.pexels.com/photos/13554928/pexels-photo-13554928.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load " alt="">
        </a>
        <a href="/photo/1125136">
            <img style="height: 400px;" src="https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="">
        </a>
        <a href="/photo/4790613">
            <img style="height: 400px;" src="https://images.pexels.com/photos/4790613/pexels-photo-4790613.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="">
        </a>
    </body>
    </html>`)
})
app.get("/photo/:id", (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    let pageContent="";
    let id =req.params.id;
    if(id === "16063554"){
        pageContent="<img src='https://images.pexels.com/photos/16063554/pexels-photo-16063554.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' width='700px'>"
    }else if(id === "16211087"){
        pageContent="<img src='https://images.pexels.com/photos/16211087/pexels-photo-16211087.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' width='700px'>"
    }else if(id === "13554928"){
        pageContent="<img src='https://images.pexels.com/photos/13554928/pexels-photo-13554928.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' width='700px'>"
    }else if(id === "1125136"){
        pageContent="<img src='https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1600' width='700px'>"
    }else if(id === "4790613"){
        pageContent="<img src='https://images.pexels.com/photos/4790613/pexels-photo-4790613.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' width='700px'>"
    }
    res.end(pageContent)
})

app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})