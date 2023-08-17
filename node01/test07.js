const fs =require("fs");
const rs = fs.createReadStream("./video/movie.mp4");

rs.on("data", function(chunk){
    console.log(chunk.length);
})
rs.on("end", function(){
    console.log("讀取結束");
})