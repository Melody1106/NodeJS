const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{

    res.send("首頁")
})
router.get("/home", (req, res)=>{

    res.send("前台首頁")
})
router.get("/search", (req, res)=>{

    res.send("搜尋")
})

module.exports = router;