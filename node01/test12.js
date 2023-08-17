const { error } = require("console");
const fs =require("fs");

// fs.readdir("./video", (error, data)=>{
// if(error){

//     console.log("讀取資料夾失敗");
//     return false;
// } 
// console.log(data);
// });

// let data=fs.readdirSync("./",);
// console.log(data);

// fs.rmdir("./html", error=>{
//     if(error){
//         console.log("刪除資料夾失敗");
//         return false;
//     }
//     console.log("刪除資料成功");

// })

// fs.rmdir("./a", {recursive: true},error=>{
//     if(error){
//         console.log("刪除資料夾失敗");
//         return false;
//     }
//     console.log("刪除資料成功");

// })

fs.rmSync("./html",{recursive: true});
