const fs =require("fs");
const path = require("path");
//取得當前作業系統中用於分隔檔案路徑部分的特殊符號
// console.log(path.sep);

//console.log(path.resolve("test.txt"));
//resolve 是解決 補完全不路徑

// console.log(__filename);
// console.log(path.parse(__filename));

let file = "./pp.txt";
let pathName = path.resolve(__dirname + file);
console.log(pathName);
let pathObj = path.parse(pathName);
//console.log(pathObj.ext);

const {name: a1, ext: a2} = pathObj;
console.log(a1, a2);
