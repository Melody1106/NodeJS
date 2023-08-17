const http = require("http");
const fs = require("fs");
const path=require("path");

const server = http.createServer((req, res)=>{
    let {pathname}=new URL(req.url,"http://localhost");
    if(pathname === "/"){
        res.setHeader("content-type", "text/html;charset=utf-8")
        let file= path.resolve(__dirname+"/page.html")
        let data=fs.readFileSync(file);
        res.end(data);
    }else if(pathname === "/bootstrap-5.3.1-dist/css/bootstrap.css"){
        let file= path.resolve(__dirname+"/bootstrap-5.3.1-dist/css/bootstrap.css");
        let data =fs.readFileSync(file);
        res.end(data);
    }else if(pathname === "/js/pag.js"){
        let file= path.resolve(__dirname+"/js/pag.js");
        let data =fs.readFileSync(file);
        res.end(data);
    }else if(pathname === "/image/pic-02.png"){
        let file= path.resolve(__dirname+"/image/pic-02.png");
        let data =fs.readFileSync(file);
        res.end(data);
    }else{
        req.statusCode = 404;
        res.setHeader("content-type", "text/html;charset=utf-8")
        res.end("<h1>找不到!</h1>");
    }
});

server.listen(9000, ()=>{
    console.log("伺服器已啟動 http://localhost:9000");
})