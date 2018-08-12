var express = require('express');

var router = express.Router();


// @Route GET api/users/test
// @desc Test Users Route
// @acess Public
router.get('/test',(req,res)=>{
    res.json({"message" : "In users Routes"});
});

module.exports =  router;