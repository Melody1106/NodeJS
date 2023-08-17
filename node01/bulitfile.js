const fs =require("fs");
// fs.mkdir("./homework03",error=>{
//     if(error){
//         console.log("建立資料夾失敗");
//         return false;
//     }
//     console.log("建立資料成功");

// })

fs.readdir("./work", (error, data)=>{
if(error){

    console.log("讀取資料夾失敗");
    return false;

} 
let file;
data.forEach(file=>{
    console.log(file);
})
if(file>10){
    newFile= "0"+file;
}
console.log(file);
});
