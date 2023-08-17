const express = require("express");
const app = express();

app.get("/", (request, response)=>{
   response.end("Hello express")
})
app.get("/home", (request, response)=>{
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.end("這裡是home")
})
app.get("/login", (request, response)=>{
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.end(`<h1>這裡是登陸頁<h1>
    <form action="/login" method="post">
    <input type="text" name="id">
    <button>送出</button>
 </form>
    `)
})
app.post("/login", (request, response)=>{
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.end("這裡是post登陸流程")
    
})
app.all("*", (request, response)=>{
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.end("<h1>找不到頁面<h1>")
})

app.listen(3000, ()=>{
    console.log("服務器建立成功：http://localhost:3000");
})