const http = require("http");
const fs = require("fs");
const path = require("path")


const server = http.createServer((request, response)=>{
    // console.log("要求方法是:"+ request.method);
    //  console.log("要求路徑是:"+ request.url);
    
    response.setHeader("content-type", "text/html;charset=utf-8")
    //let file= __dirname+"/template.html"
    let file= path.resolve(__dirname+"/template01.html");
    let data =fs.readFileSync(file);
   response.end(data);
})

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})