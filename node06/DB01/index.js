const mysql = require("mysql2");
const connection = require("./db");

const express = require("express");
const app = express();

app.get("/", (req, res)=>{
  res.send("首頁");
});

app.get("/d/:id",(req,rea)=>{
    const id = req.params.id;
    connection.execute(
      "SELECT * FROM `sort` WHERE `id` = ?",
      [id],
      (error, results)=>{
        let sort = results.map(item=>{
          return {sn: item.id, item: item.name}
        })
        res.json({sort})
      }
    )
  })

app.listen(3000, ()=>{
  console.log("服務啟動於 http://localhost:3000/");
});

//單一句 query 的寫法，把 sort 資料表內容取出
// connection.query(
//     'SELECT * FROM `sort`',
//     function(err, results, fields) {
//       console.log(results);
//       console.log(fields);
//     }
//   );


//[ { id: 5, name: '娛樂', isvalid: 0 } ]
// connection.execute(
//     "SELECT * FROM `sort` WHERE `id` = ?",
//     [5],
//     (error, result)=>{
//         console.log(result);
//     }
// )

//如果要取得指定 id 的 SQL 是這樣寫   
//   connection.query(
//   "SELECT * FROM `sort` WHERE `id` = ?",
//   [4],
//   (error, result)=>{
//     console.log(result);
//   })