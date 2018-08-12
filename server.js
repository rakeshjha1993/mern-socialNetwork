var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

var users = require('./routes/apis/users');
var posts = require('./routes/apis/post');
var profiles = require('./routes/apis/profile');

app.get('/',(req,res) => {
    res.send('I am Okay');
});

const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(()=> console.log('mongodb connected')).catch((err) => console.log(err.message));

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);

app.listen(port, (err) => {
    if(err){
        console.log(`Error : ${err.message}`);
    }
    console.log(`app is listening on ${port}`);
});