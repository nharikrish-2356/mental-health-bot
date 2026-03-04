const express = require("express");
const router = express.Router();
const db = require("./database");
router.post("/login",(req,res)=>{

    const {username,password} = req.body;

    const query = "SELECT * FROM users WHERE username=? AND password=?";

    db.get(query,[username,password],(err,row)=>{

        if(err)
            return res.json({error:"Database error"});

        if(!row)
            return res.json({error:"Invalid login"});

        res.json({success:"Login successful"});
    });

});

router.post("/signup", (req,res)=>{

    const {username,password} = req.body;

    if(!username || !password)
        return res.json({error:"Missing fields"});

    const query = "INSERT INTO users(username,password) VALUES(?,?)";

    db.run(query,[username,password],err=>{

        if(err)
            return res.json({error:"Username already exists"});

        res.json({success:"Account created"});
    });

});

module.exports = router;