const { v4: uuidv4 } = require('uuid');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// db.defaults({ products: [], user: {} }).write();

// db.get("products")
//     .push({
//         id: uuidv4(),
//         title: "小黃瓜",
//         price: 35,
//         stock: 100,
//         createTime: Date.now()
//     }).write();

// db.set("users.id", uuidv4())
//     .set("users.account", "user1")
//     .set("users.password", "user1")
//     .set("users.name", "Valwood Pkwy")
//     .set("users.head", "https://randomuser.me/api/portraits/men/64.jpg")
//     .write();

// let id = uuidv4();
// let user = {
//     id: id,
//     name: "user1",
//     account: "user1",
//     password: "Valwood Pkwy",
//     head: "https://randomuser.me/api/portraits/men/64.jpg"
// }
// db.set(`users.${id}` , user).write();

//讀取所又內容
// console.log(db.get("products").value());

//title id 查找
// let data = db.get("products")
//     .find({title: "櫛瓜"})
//     .value()

//     console.log(data);

//關鍵字尋找
// let data = db.get("products")
//     .filter(d=>d.title.includes("瓜"))
//     .value()
//     console.log(data);

//分頁-每頁5筆
let data = db.get("products").slice(0).take(5).value();
console.log(data);