// const http = require("http");
// const server = http.createServer((request, response)=>{
// console.log(request.headers);
// response.setHeader("content-type", "text/html;charset=utf-8")
// response.end("用這個方法取得要求頭 方法會得到一個物件，裡面就包含要求頭的所有內容")

// });

// server.listen(9000,()=>{
//     console.log("伺服器成功建立 http://localhost:9000/");
// });

const http = require("http");
const server = http.createServer((request, response)=>{
console.log(request.url);
response.setHeader("content-type", "text/html;charset=utf-8")
response.end("接著使用url來得到要求訊息的路徑")

});

server.listen(9000,()=>{
    console.log("伺服器成功建立 http://localhost:9000/");
});