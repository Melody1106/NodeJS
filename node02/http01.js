
const http = require("http");

const server = http.createServer((req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end("Hello Server! 你好, 主機");
});

server.listen(9000, ()=>{
    console.log("伺服器已經啟動 http://localhost:9000/");
})