//使用js url 模組，取用pathname & query
const http = require("http");


const server = http.createServer((request, response)=>{
    // console.log("要求方法是:"+ request.method);
    //  console.log("要求路徑是:"+ request.url);
    let {pathname, searchParams:query}=new URL(request.url, "http://localhost");
    console.log(pathname);
    console.log(query.get("name"));
    console.log(query.get("pwd"));
  
    response.end("Hello server http05")
})

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})