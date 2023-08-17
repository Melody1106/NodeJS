const fs =require("fs");

// for (let i = 1; i < 20; i++) {

//     fs.rename(`./work${i}.html`,`./work/work${i}.html`,function(error){
//         if(error){
    
//             console.log("重新命名失敗");
//             return false;
//         }
//         console.log("重新命名成功");
//     });
// }

//teacher write
for(let i=1; i<=20; i++){
    fs.rename(`./work${i}.html`, `./work/work${i}.html`,error=>{
        if(error){
            console.log("操作失敗");
            return false;
        }
        console.log("操作成功");
    })
}