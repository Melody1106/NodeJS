const fs =require("fs");

// let data = fs.readFileSync("./video/movie.mp4");
// fs.writeFileSync("./video/movie2.mp4", data);

const rs = fs.createReadStream("./video/movie.mp4");
const ws = fs.createWriteStream("./video/movie5.mp4");

// rs.on("data", function(chunk){
//     ws.write(chunk);
// })
rs.on("end", function(){
    console.log("讀取結束");
})
rs.pipe(ws);