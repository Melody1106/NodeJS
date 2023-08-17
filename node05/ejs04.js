const express = require("express");
const path = require("path");
const app = express();

let user;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.static(path.resolve(__dirname , "./public")));

app.get("/", (req, res)=>{
    res.send("首頁");
});

app.get("/test1", (req, res)=>{
    let name = "Ben";
    let str = "Hello, EJS!!";
    res.render("test1", {str, name});
});

app.get("/test2", (req, res)=>{
    const blackpink = ["Jennie", "Jisoo", "Lisa", "Rosé"];
    res.render("test2", {blackpink});
});

app.get("/test3", (req, res)=>{
    res.render("test3", {user});
});

app.get("/logout", (req, res)=>{
    user = undefined;
    res.redirect("/test3");
});

app.get("/login", (req, res)=>{
    user = {
        name: "Ben",
        img: "https://randomuser.me/api/portraits/women/23.jpg"
    }
    res.redirect("/test3");
});

app.listen(3000, ()=>{
    console.log("server is running.");
});