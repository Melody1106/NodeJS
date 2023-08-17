const fs = require("fs");



for (let i = 1; i <= 20; i++) {

    const file1 = `./work${i}.html`;
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

    fs.writeFileSync(file1, content, (error)=>{
        if(error){
            console.log("1 寫入失敗");
            return false;
        }
        console.log("2 寫入成功");
    })
    console.log("3 測試用字串");
}
    
