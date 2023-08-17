const { log } = require("console");
const fs =require("fs");

let dir="./a/b/c";
let result = fs.existsSync(dir);
//console.log(result);
if(!result){
    fs.mkdir(dir,{recursive: true}, error=>{
    if(error){
        console.log("建立資料夾失敗");
        return false;
    }
    console.log("資料夾建立成功");
});

}
