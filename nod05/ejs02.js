const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const blackpink = ["Jennie", "Jisoo", "Lisa", "Rosé"];

// let str = "<ol>\n\r";
// blackpink.forEach(name=>{
//     str += `  <li>${name}</li>\n\r`;
// });
// str += "</ol>";

let template = fs.readFileSync(path.resolve(__dirname, "./template02.html")).toString();
let result = ejs.render(template, {blackpink});

console.log(result);