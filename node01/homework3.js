const fs = require("fs");
const dir = "./work";
let files = fs.readdirSync(dir);
//console.log(data);

//return false;
files.forEach((file) => {
  let ary = file.split(".");
  //console.log(ary);
  let num = parseInt(ary[0].substring(4));
  if (num < 10) {
    num = "0"+num;
    let newFile = dir+"/work"+num+"."+ary[1];
    fs.renameSync(dir+"/"+file, newFile)
    //console.log(newFile);
  }
});

// let file ="work1001.html";
// let ary = file.split(".");
// console.log(ary);
// let num = parseInt(ary[0].substring(4));
// if(num<10){
//     num = "0"+num;
//     let newFile="work"+num+"."+ary[1];
//     console.log(newFile);
// }
