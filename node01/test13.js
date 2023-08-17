const { log } = require("console");
const fs = require("fs");

fs.stat("./video/movie3.mp4", (error, stat) => {
  if (error) {
    console.log("讀取檔案失敗");
    return false;
  }
  console.log(stat);
});
