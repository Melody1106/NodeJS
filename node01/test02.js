const fs = require("fs");

const file1  = "./測試寫入2.txt";
const content = "前明月光，舉頭望明月";

try{
    fs.writeFileSync(file1, content);
    console.log('1寫入成功');
}catch(error){
    console.log("2寫入失敗");
}
console.log("3測試用字串");