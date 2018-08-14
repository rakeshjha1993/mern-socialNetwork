var express = require('express');

var router = express.Router();


// @Route GET api/posts/test
// @desc Test Post Route
// @acess Public
router.get('/test',(req,res)=> {
    res.json({"message":"In post Routes"});
});

module.exports =  router;