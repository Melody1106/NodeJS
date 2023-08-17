const express = require("express")
const router = express.Router();

router.get("/admin", (req, res)=>{
 
    res.send("管理後臺")
})
router.get("/setting", (req, res)=>{

    res.send("網站設定")
})

module.exports=router;