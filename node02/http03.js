const http = require("http");
const server = http.createServer((request, response)=>{
    // console.log("要求方法是:"+ request.method);
    // console.log("要求路徑是:"+ request.url);
    let body = "";
    request.on("data",chunk=>{
        body+=chunk;
    });
    request.on("end",chunk=>{
       console.log("要求的內容是:"+body);
        response.end("Hello server")
    })
})

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})