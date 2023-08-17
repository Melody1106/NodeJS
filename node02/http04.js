//使用url 模組，取用pathname&query
const http = require("http");
const url = require("url");

const server = http.createServer((request, response)=>{
    // console.log("要求方法是:"+ request.method);
     console.log("要求路徑是:"+ request.url);
    let {pathname, query} = url.parse(request.url, true)
    console.log(pathname);
    console.log(query.name);
    console.log(query.pwd);
    response.end("Hello server http04")
})

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})