const { error } = require("console");
const fs = require("fs");
const file = "./測試寫入2.txt";
const content = "\r\n紅豆生南國 春來發跡之01";

// fs.appendFile(file, content, error=>{
//     if(error){
//         console.log("寫入失敗");
//         return false;
//     }
//     console.log("寫入成功");
// });

// fs.appendFileSync(file, content);

fs.writeFileSync(file, content, {flag :"a"});