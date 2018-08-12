var express = require('express');

var router = express.Router();

router.get('/test',(req,res)=> {
    res.json({"message":"In post Routes"});
});

module.exports =  router;