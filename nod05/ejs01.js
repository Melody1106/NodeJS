const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

let name = "Ben";
let str = "Hello, EJS!!";
let file = path.resolve(__dirname, "./template01.html");
// let file = __dirname + "/template01.html";
let template = fs.readFileSync(file).toString();
let result = ejs.render(template, {str, name});

console.log(result);