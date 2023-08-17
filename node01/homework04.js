const fs =require("fs");

// fs.mkdir("./zero", function(error){
//     if(error){
//       console.log("建立資料夾失敗");
//       return false;
//     }
//     console.log("建立資料夾成功");
//   });

//---------------------------
for (let i = 1; i <= 20; i++) {

    const file1 = `./zero/work${i}.html`;
    const content = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>這是第"+ ${i} + "個 HTML 檔
    ;<h2>
</body>
</html>
    `;

    try{
        fs.writeFileSync(file1, content);
        console.log("寫入成功");
    }catch(error){
        console.log("寫入失敗");
    }
    //console.log("繼續程式");
    // fs.writeFileSync(file1, content, (error)=>{
    //     if(error){
    //         console.log("1 寫入失敗");
    //         return false;
    //     }
    //     console.log("2 成功");
    // })
}
//--------------------------
const dir = "./zero";
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


