const fs =require("fs");

// fs.unlink("測試寫入2,txt", error=>{
//     if(error){
//         console.log("刪除失敗");
//         return false;
//     }
//     console.log("刪除成功");
// });

//----rm
// fs.rm("測試寫入3,txt", error=>{
//     if(error){
//         console.log("刪除失敗");
//         return false;
//     }
//     console.log("刪除成功");
// });

fs.rmSync("./測試寫入2.txt");