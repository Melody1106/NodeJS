const fs = require("fs");

const file1  = "./測試寫入.txt";
const content = "前明月光，舉頭望明月";

fs.writeFile(file1, content, (error)=>{
    if(error){
        console.log("1 寫入失敗");
        return false;
    }
    console.log("2 寫入成功");
});

console.log("3 測試用字串");

// fs.writeFile(file1 ,content ,function(error){
//     if(error){
//         console.log("寫入失敗");
//         return false;
//     }
//     console.log("寫入成功");
// } );