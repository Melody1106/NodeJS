const express = require('express');
const moment = require("moment");
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.send('導向今天的日期');
    let today = moment().format("YYYY-MM-DD");
    res.redirect("/expe/d/"+today)
});

router.get('/d/:date', function(req, res, next) {
    let date = req.params.date;
  //res.send('讀取 指定日期消費');
  res.render('index', { date });
});

router.post('/', (req, res)=>{
    res.send("新增 指定日期消費")
})
router.put('/', (req, res)=>{
    res.send("修改 指定日期消費")
})
router.delete('/', (req, res)=>{
    res.send("刪除 指定日期消費")
})

module.exports = router;
