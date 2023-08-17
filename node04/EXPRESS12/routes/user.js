const express = require("express");
const router = express.Router();

router.get("/user", (req, res)=>{

    res.send("使用者的入口頁面")
})
router.get("user/search", (req, res)=>{
    
    res.send("搜尋使用者帳號")
})

router.get("/:id", (req, res)=>{
    let id =req.params.id;
    res.send(`使用者該${id}的頁面`);
})
module.exports = router;