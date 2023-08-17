const express = require("express");
const front = require("./routes/front")
const back = require("./routes/back")
const user = require("./routes/user")
const app = express();

app.use(front);
app.use(back);
app.use("/user",user);


app.listen("3000",()=>{
    console.log("服務器建立成功 http://localhost:3000");
})