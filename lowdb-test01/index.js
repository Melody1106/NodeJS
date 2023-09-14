const { v4: uuidv4 } = require('uuid');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// db.defaults({ products: [], user: {} }).write();

//寫入
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
//用物件建立資料
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

//分頁-.slice代表取的第幾頁 .take每頁5筆
// let data = db.get("products").slice(0).take(5).value();
// console.log(data);


//排序 小-大 a-b
// let data = db.get("products").sort((a,b)=>a.price - b.price).value();
// console.log(data);

// let data = db.get("products").sort((a,b)=>a.price - b.price)
// .slice(0).take(5).value();

// let data = db.get("products").slice(0).take(5).sort((a,b)=>a.price - b.price).value()

//修改
// let data = db.get("products").find({id: "f3e3b921-3b56-4894-8602-aa323c26697a"}).assign({stock: 10}).write();

//刪除
// let data = db.get("products").remove({id: "bf820195-e2b6-475e-abd1-027929bd30ed"}).write();

// console.log(data);
