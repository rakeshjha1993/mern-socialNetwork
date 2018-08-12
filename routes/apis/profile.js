var express = require('express');

var router = express.Router();



// @Route GET api/profiles/test
// @desc Test Profile Route
// @acess Public
router.get('/test',(req,res)=>{
    res.json({"message": "In profile Routes"});
});

module.exports =  router;