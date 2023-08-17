const http = require("http");
const fs = require("fs");
const path = require("path")


const server = http.createServer((request, response)=>{
    let {pathname}=new URL(request.url,"http://localhost");
    if(pathname === "/"){
        response.setHeader("content-type", "text/html;charset=utf-8")
        //let file= __dirname+"/template.html"
        let file= path.resolve(__dirname+"/page1.html");
        let data =fs.readFileSync(file);
       response.end(data);
    }else if(pathname === "/page1.css"){
        let file= path.resolve(__dirname+"/page1.css");
        let data =fs.readFileSync(file);
        response.end(data);
    }else if(pathname === "/page1.js"){
        let file= path.resolve(__dirname+"/page1.js");
        let data =fs.readFileSync(file);
        response.end(data);
    }else{
        request.statusCode = 404;
        response.setHeader("content-type", "text/html;charset=utf-8")
        request.end("<h1>找不到!</h1>");
    }
    
})

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})