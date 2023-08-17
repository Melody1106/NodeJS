
const express = require("express");
let {singers} =  require("./singers")
const app = express();

app.get("/", (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end("首頁")
})
app.get("/singer/:id.html", (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    let id =req.params.id;
    let result = singers.find(singer=>{
        // if(singer.id === parseInt(id)){
        //     return true;
        // }
        return (singer.id === parseInt(id))
    });
   // res.json(result);
   res.end(`
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>${result.singer_name}'s Page</title>
   </head>
   <body>
       <h1>${result.singer_name}</h1>
       <img src="${result.singer_img}" alt="">
   </body>
   </html>
   `);
})

app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})