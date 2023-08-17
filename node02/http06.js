//使用js url 模組，取用pathname & query
const http = require("http");


const server = http.createServer((request, response)=>{
    // console.log("要求方法是:"+ request.method);
    //  console.log("要求路徑是:"+ request.url);
    let {pathname}=new URL(request.url, "http://localhost");
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.setHeader("Hello", "i live UUU")

    if(pathname === "/"){
        response.write("首頁")
    }else if(pathname === "/login"){
        response.write("登陸頁")
    }else if(pathname === "/reg"){
        response.write("註冊頁")
    }else{
        response.statusCode = 404;
        response.statusMessage="i love U"
        response.write("找不到該頁")
    }
  response.end("12345");
})

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})