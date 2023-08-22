const express = require('express');
const moment = require("moment");
const multer = require("multer");
const connection = require("../db");
const router = express.Router();
const upload = multer();

router.get('/', function(req, res, next) {
//   res.send("導向今天的日期");
    let today = moment().format("YYYY-MM-DD");
    res.redirect("/expe/d/"+today);
});

router.get('/d/:date', async (req, res, next)=>{
//   res.send("讀取 指定日期的消費");
    let date = req.params.date;
    let sort;
    try{
        sort = await getSort();
    }catch(error){
        console.log(error);
    }
    let dateData = await getDateData(date).then((data)=>{
        return data;
    }).catch((error)=>{
        console.log(error);
        return undefined;
    });

    if(sort && dateData){
        res.render('index', { date, sort, dateData });
    }else{
        res.send("錯誤發生，請洽系統管理員")
    }
    
});

router.post("/", (req, res)=>{
    console.log(req.body);
    let title = req.body.title;
    let money = parseInt(req.body.money);
    let sort  = parseInt(req.body.sort);
    let date = req.body.date;
    connection.execute(
        "INSERT INTO `expense` (`id`, `title`, `sort`, `money`, `date`) VALUES (NULL, ?, ?, ?, ?)",
        [title, sort, money, date],
        (error, results)=>{
            if(error){
                res.json({error});
                return false;
            }
            // res.json({results});
            res.redirect("/expe/d/"+date);
        }
    );
});

router.put("/", upload.none(), async(req, res)=>{
   let result = await updateData(req.body).then((data)=>{
        return 1;
   }).catch((error)=>{
        return 0;
   });
   res.json({result})
});

router.delete("/",upload.none(), async(req, res)=>{
    let result = await deleteData(req.body).then((data)=>{
        return 1;
   }).catch((error)=>{
        return 0;
   });
   res.json({result})
});

module.exports = router;

function deleteData(data){
    
    let id = parseInt(data.id);
    return new Promise((resolve, reject)=>{   
        connection.execute(
            "DELETE FROM expense WHERE `expense`.`id` = ?",
            [id],
            (error, result)=>{
                if(error){
                    reject(error);
                    return false
                }
                resolve(result);
            }
        );
    });
}
function updateData(data){
    let title = data.title;
    let sort = parseInt(data.sort);
    let money = parseInt(data.money);
    let id = parseInt(data.id);
    return new Promise((resolve, reject)=>{   
        connection.execute(
            "UPDATE `expense` SET `title` = ?, `sort` = ?, `money` = ? WHERE `expense`.`id` = ?",
            [title, sort, money, id],
            (error, result)=>{
                if(error){
                    reject(error);
                    return false
                }
                resolve(result);
            }
        );
    });
}


function getDateData(date){
    return new Promise((resolve, reject)=>{
        connection.execute(
            "SELECT * FROM `expense` WHERE `date` = ?",
            [date],
            (error, results)=>{
                if(error){
                    reject({error});
                    return false;
                }
                resolve(results);
            }
        )
    });
}

function getSort(){
    return new Promise((resolve, reject)=>{
        connection.query(
            "SELECT * FROM `sort`",
            (error, results)=>{
                if(error){
                    reject(error);
                    return false;
                }
                let sort = results.map(result=>{
                    return {id: result.id, name:result.name};
                });
                resolve(sort);
            }
        );
    });
}