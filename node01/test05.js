const fs =require("fs");

fs.readFile("./測試寫入.txt", function(error, data){
    if(error){
        console.log("讀取失敗");
        return false;
    }
    console.log(data.toString());
});
