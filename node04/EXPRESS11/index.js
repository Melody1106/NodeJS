const express = require("express");
const app = express();
const path = require("path");

app.use((req, res, next) => {
  let referer = req.get("referer");
  let ext = path.extname(req.url);
  if (ext) {
    //去掉.
    console.log(ext.slice(1));
    //全大小或全小寫
    ext = ext.slice(1).toUpperCase();
    if (ext === "JPG" || ext === "PNG") {
      // console.log(referer);
      //如果  `referer` 不為`undefined` ，則創建一個新的  `URL`  對象來解析 `referer` 中的 URL 字符串，然後從中獲取主機名稱。

      if (referer) {
        let url = new URL(referer);
        let hostname = url.hostname;
        // console.log(hostname);
        if (hostname !== "127.0.0.1") {
          //res.status(403).send("403禁用");
          res.status(403).redirect("https://img.freepik.com/premium-vector/street-barrier-with-403-error-access-forbidden_637684-56.jpg?w=740")
          return false;
        }
      }
    }
  }

  next();
});

const publicName = path.resolve(__dirname + "/public");
app.use(express.static(publicName));

app.get("/", (req, res) => {
  res.send("首頁");
});

app.listen("3000", () => {
  console.log("服務器建立成功 http://localhost:3000");
});
